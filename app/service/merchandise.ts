import BaseService from './base';
import Merchandise = model.schema.Merchandise;
import Merchant = model.schema.Merchant;

export default class MerchandiseService extends BaseService {

    public async add(mid: string, mdise: Merchant) {
        let newMdiseId;
        try {
            newMdiseId = await this.model.merchandise.save(mdise);
        } catch (e) {
            return {
                _key: '',
                error: e.toString(),
            };
        }
        const merchant = await this.service.merchant.get(mid);
        if (merchant.merchandise_ids === undefined) {
            merchant.merchandise_ids = [newMdiseId._key];
        } else {
            merchant.merchandise_ids.push(newMdiseId._key);
        }
        try {
            return await this.model.merchant.update(mid, merchant);
        } catch (e) {
            return {
                _key: '',
                error: e.toString(),
            };
        }
    }

    public async getMerchandiseByMerchantId(mid: string) {
        const merchant = await (await this.service.merchant.findMerchantAndMerchandiseById(mid)).next();
        return merchant === undefined ? [] : merchant.merchandises;
    }
    public async modifyMerchandise(mdiseId: string, mdise: Merchandise) {
        try {
            return await this.model.merchandise.update(mdiseId, mdise);
        } catch (e) {
            return {
                _key: '',
                error: e.toString(),
            };
        }
    }

    public async deleteMerchandise(mdiseId: string) {
        try {
            return await this.model.merchandise.remove(mdiseId);
        } catch (e) {
            return {
                _key: '',
                error: e.toString(),
            };
        }
    }

    public async get(mdiseId: string) {
        return await this.model.merchandise[mdiseId];
    }
}
