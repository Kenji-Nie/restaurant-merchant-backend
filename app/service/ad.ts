import BaseService from './base';
import Ad = model.schema.Ad;

export default class AdService extends BaseService {

    public async getAdByMerchantId(mid: string) {
        const merchant = await (await this.service.merchant.findMerchantAndAdById(mid)).next();
        return merchant === undefined ? [] : merchant.ads;
    }

    public async add(mid: string, ads: any[]) {
        try {
            const mAds = (await this.model.merchant[mid]).ad_ids || [];
            const adIds = ads.map(async (item) => (await this.model.ad.save(item))._key);
            Promise.all(adIds);
            this.model.merchant.update(mid, {ad_ids: [...adIds, mAds]});
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    public async modify(id: string, ad: Ad) {
        try {
            return await this.model.merchandise.update(id, ad);;
        } catch (e) {
            return {_key: ''};
        }
    }
}
