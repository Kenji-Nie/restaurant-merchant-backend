import BaseController from './base';
import {Crypto} from 'cryptojs/cryptojs';

export default class WechatController extends BaseController {

    public async login() {
        try {

            const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + this.ctx.request.body.appid
                + '&secret=' + this.ctx.request.body.secret + '&js_code=' + this.ctx.request.body.code
                + '&grant_type=authorization_code';
            this.app.config.secrets.appid = this.ctx.request.body.appid;
            const result = await this.ctx.curl(url, {
                method: 'GET',
                dataType: 'json',
                timeout: 3000,
            });

            if (result.data.openid !== null && result.data.openid !== undefined) {
                let user = this.ctx.request.body.wechatUser;
                user.wx_uid = result.data.openid;
                await this.service.user.saveOrUpdateWechatUser(user);
            }

            this.ctx.body = {
                status: true,
                message: result
            };
        } catch (e) {
            this.ctx.body = {
                status: false
            };
        }

    }

    private async decodeUserInfo(sessionKey: string, encryptedData: string, iv: string) {

        var encryptedData = Crypto.util.base64ToBytes(encryptedData);
        var key = Crypto.util.base64ToBytes(sessionKey);
        var iv = Crypto.util.base64ToBytes(iv);

        var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);

        try {
            // 解密
            var bytes = Crypto.AES.decrypt(encryptedData, key, {
                asBpytes: true,
                iv: iv,
                mode: mode
            });

            var decryptResult = JSON.parse(bytes);

        } catch (err) {
            console.log(err)
        }

        if (decryptResult.watermark.appid !== this.ctx.request.body.appid) {
            console.log('错误')
        }

        console.log(decryptResult);


        // console.log(decrypted);

    }

}
