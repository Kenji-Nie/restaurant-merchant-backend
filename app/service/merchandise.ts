import BaseService from './base';
import Merchandise = model.schema.Merchandise;

export default class MerchandiseService extends BaseService {

    public async addMerchandise(mdise: Merchandise) {
        try {
            return await this.model.merchandiseType.save(mdise);
        } catch (e) {
            return {_key: ''};
        }
    }

    public async getMerchandiseByMerchantId(mid: string) {
        const merchant = await (await this.service.merchant.findMerchantAndMerchandiseById(mid)).next();
        return merchant.merchandises;
    }
    public async modifyMerchandise(mdiseId: string, mdise: Merchandise) {
        try {
            return await this.model.merchandise.update(mdiseId, mdise);
        } catch (e) {
            return {_key: ''};
        }
    }

    public async deleteMerchandise(mdiseId: string) {
        try {
            return await this.model.merchandise.remove(mdiseId);
        } catch (e) {
            return {_key: ''};
        }
    }

    public async get(mdiseId: string) {
        return await this.model.merchandise[mdiseId];
    }
}
