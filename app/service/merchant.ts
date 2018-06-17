import BaseService from './base';
import Merchant = model.schema.Merchant;

export default class MerchantService extends BaseService {
    public async findMerchantAndMerchandiseTypeById(mid: string) {
        return await this.findInnnerJoinById(mid, ['merchandiseType']);
    }

    public async findMerchantAndMerchandiseById(mid: string) {
        return await this.findInnnerJoinById(mid, ['merchandise']);
    }

    // public async addMerchant(mt: Merchant) {
    //     mt.type = {name: '待认证'};
    //     try {
    //         return await this.model.merchant.save(mt);
    //     } catch (e) {
    //         return {_key: ''};
    //     }
    // }

    public async get(mid: string) {
        return await this.model.merchant[mid];
    }

    /**
     * 通过店铺ID查找店铺及席位类型
     * @param {string} id
     * @returns {Promise<ArrayCursor>}
     */
    public async findMerchantAndSeatTypeById(id: string) {
        return await (await this.findInnnerJoinById(id, ['seatType'])).next();
    }
}
