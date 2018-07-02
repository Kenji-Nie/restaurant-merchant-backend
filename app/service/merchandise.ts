import BaseService from './base';
import Merchandise = model.schema.Merchandise;
import Merchant = model.schema.Merchant;

export default class MerchandiseService extends BaseService {

    public async add(mid: string, mdise: Merchandise) {
        let newMdiseId;
        try {
            mdise.shelf_flag = false;
            mdise.sale_volume = 0;
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

    public async deleteMerchandise(merchantId: string, mdiseIds: string[]) {
        const result: Array<object> = [];
        const merchant: Merchant = await this.model.merchant[merchantId];
        if (merchant.merchandise_ids === undefined) {merchant.merchandise_ids = []; }
        let state: boolean = true;
        try {
            for (const id of mdiseIds) {
                result.push(await this.model.merchandise.remove(id));
                merchant.merchandise_ids = merchant.merchandise_ids.filter((item) => (
                    item !== id
                ));
            }
            result.push(await this.model.merchant.update(merchantId, merchant));
        } catch (e) {
            result.push({
                _key: '',
                error: e.toString(),
            });
            state = false;
        }
        return {
            message: result,
            status: state,
        };
    }

    public async shelfMerchandise(mdiseIds: string[]) {
        const result: Array<object> = [];
        let state: boolean = true;
        try {
            for (const id of mdiseIds) {
                const oldObj = await this.service.merchandise.get(id);
                const shelfFlag: boolean =  (oldObj.shelf_flag === undefined) ? false : oldObj.shelf_flag;
                const newObj = Object.assign(
                    {}, oldObj, {shelf_flag: !shelfFlag});
                result.push(await this.service.merchandise.modifyMerchandise(id, newObj));
            }
        } catch (e) {
            result.push({
                _key: '',
                error: e.toString(),
            });
            state = false;
        }
        return {
            message: result,
            status: state,
        };
    }

    public async get(mdiseId: string) {
        return await this.model.merchandise[mdiseId];
    }
}
