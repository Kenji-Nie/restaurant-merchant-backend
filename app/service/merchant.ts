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
        mt.status = 0;
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
     * 根据店铺的ID更新该商家的商铺信息
     * @param {string} uid
     * @param {model.schema.Merchant} merchantMessage
     * @returns {Promise<any>}
     */
    public async updateMerchant(mid: string, merchantMessage: Merchant) {
        return await this.model.user.update(mid, merchantMessage);
    }

    /**
     * 选择店铺---根据店铺ID删除对应的店铺
     * @param {string} mid
     * @returns {Promise<void>}
     */
    public async deleteMerchant(mid: string) {
        return await this.model.merchant.drop[mid];
    }

    /**
     * 根据店铺ID查找店铺及席位类型
     * @param {string} mid
     * @returns {Promise<void>}
     */
    public async findMerchantAndSeatTypeById(mid: string) {
        return await (await this.findInnnerJoinById(mid, ['seatType'])).next();
    }

    /**
     * 根据店铺ID查找店铺及席位类型
     * @param {string} mid
     * @returns {Promise<void>}
     */
    public async findMerchantAndSeatById(mid: string) {
        return await (await this.findInnnerJoinById(mid, ['seat'])).next();
    }

    /**
     * 根据该商铺的id查找针对该商家的所有客户信息
     * @param {string} mid
     * @returns {Promise<void>}
     */
    public async listMerchantUser(mid: string) {
        const merchant = await this.model.merchant[mid];
        return await merchant.user_ids;
    }

}
