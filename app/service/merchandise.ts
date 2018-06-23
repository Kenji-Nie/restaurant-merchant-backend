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

    public async deleteMerchandise(mdiseIds: string[]) {
        const result: Array<object> = [];
        let state: boolean = true;
        try {
            for (const id of mdiseIds) {
                result.push(await this.model.merchandise.remove(id));
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
