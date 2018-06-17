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
        // mt.type = {name: '待认证'};
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
     * 根据商家的id 更新该商家的商铺信息
     * @param {string} uid
     * @param {model.schema.Merchant} merchantMessage
     * @returns {Promise<any>}
     */
    public async updateStore(mid: string, merchantMessage: Merchant) {
        return await this.model.user.update(mid, merchantMessage);
    }

    /**
     * 选择店铺---根据店铺ID删除对应的店铺
     * @param {string} mid
     * @returns {Promise<void>}
     */
    public async deleteStore(mid: string) {
        return await this.model.merchant.drop[mid];
    }
}
