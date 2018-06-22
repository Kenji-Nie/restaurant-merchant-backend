import BaseService from './base';
import Ad = model.schema.Ad;

export default class AdService extends BaseService {

    public async getAdByMerchantId(mid: string) {
        const merchant = await (await this.service.merchant.findMerchantAndAdById(mid)).next();
        return merchant === undefined ? [] : merchant.ads;
    }

    public async modify(id: string, ad: Ad) {
        try {
            return await this.model.merchandise.update(id, ad);
        } catch (e) {
            return {_key: ''};
        }
    }
}
