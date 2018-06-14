import BaseService from './base';
import Merchant = model.schema.Merchant;

export default class MerchantService extends BaseService {
    public async findMerchantAndMerchandiseTypeById(mid: string) {
        return await this.findInnnerJoinById(mid, ['merchandiseType']);
    }

    public async findMerchantAndMerchandiseById(mid: string) {
        return await this.findInnnerJoinById(mid, ['merchandise']);
    }

    public async addMerchant(mt: Merchant) {
        mt.type = {name: '待认证'};
        try {
            return await this.model.merchant.save(mt);
        } catch (e) {
            return {_key: ''};
        }
    }

    public async get(mid: string) {
        return await this.model.merchant[mid];
    }

    /**
     * 通过管理员ID获取该用户的商铺信息
     * @param {string} aid
     * @returns {Promise<void>}
     */
    public async getMerchantsByAdminId(aid: string ) {
        const admin = await this.model.admin[aid];
        return await this.findByProperty('merchants', admin.merchants);
    }
}
