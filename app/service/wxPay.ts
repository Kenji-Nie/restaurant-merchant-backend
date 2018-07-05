import * as crypto from 'crypto';
import * as convert from 'xml-js';
import BaseService from './base';

const ORDER_URL = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
export default class AdService extends BaseService {
    public async prePay(params: any) {
        const secrets = this.app.config.secrets.default[params.openid];
        let data = Object.assign({
            appid: secrets.appid,
            mch_id: '1489984772',
            nonce_str: this.getNonce(),
            trade_type: 'JSAPI',
            notify_url: 'http://www.weixin.qq.com/wxpay/pay.php', // test
            out_trade_no: Date.now(),
            body: 'test',
            total_fee: 1,
        }, params);

        data.sign = this.sign(data, '1wdv4Thn9JyH86UJki89Oiu67Gfr45Hy');

        data = convert.js2xml({xml: data}, {compact: true, spaces: 2});

        const res = await this.app.curl(ORDER_URL, {
            method: 'POST',
            data,
        });
        res.data = convert.xml2js(res.data.toString(), {compact: true});

        return res;
    }

    public generateResponse(raw, params) {
        const secrets = this.app.config.secrets.default[params.openid];
        const res = {
            appId: raw.appid._cdata,
            timeStamp: parseInt(Date.now() / 1000 + '', 10),
            nonceStr: this.getNonce(),
            package: `prepay_id=${raw.prepay_id._cdata}`,
            signType: 'MD5',
        };

        for (const k of Reflect.ownKeys(res)) {
            if (res[k] == null) return raw;
        }

        res['paySign'] = this.sign(res, '1wdv4Thn9JyH86UJki89Oiu67Gfr45Hy');

        delete res['appId'];

        return res;
    }

    private sign(obj, key) {
        const algorithm = obj.sign_type || 'md5';

        const objKeys = <Array<string>> Reflect.ownKeys(obj).filter(o => obj[o]);

        const sorted = objKeys.sort((a: string, b) => {
            return a < b ? -1 : 1;
        }).map(k => {
            return `${k}=${obj[k]}`;
        });

        const signature = crypto.createHash(algorithm)
            .update(`${sorted.join('&')}&key=${key}`).digest('hex').toUpperCase();

        return signature;
    }

    private getNonce() {
        const rand = parseInt(Math.random() * 1e9 + '', 10);
        const nonce = crypto.createCipher('seed', rand.toString()).final('hex');
        return nonce;
    }
}
