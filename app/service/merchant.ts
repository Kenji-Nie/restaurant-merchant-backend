import BaseService from './base';
import Merchant = model.schema.Merchant;
import string from '../extend/lib/string';

export default class MerchantService extends BaseService {
    public async findMerchantAndMerchandiseTypeById(mid: string) {
        return await this.findInnnerJoinById(mid, ['merchandiseType']);
    }

    public async findMerchantAndMerchandiseById(mid: string) {
        return await this.findInnnerJoinById(mid, ['merchandise']);
    }

    public async findMerchantAndAdById(mid: string) {
        return await this.findInnnerJoinById(mid, ['ad']);
    }

    public async findMerchantAndCouponById(mid: string) {
        return await this.findInnnerJoinById(mid, ['coupon']);
    }

    public async addMerchant(mt: Merchant) {
        mt.status = 0;
        try {
            return await this.model.merchant.save(mt);
        } catch (e) {
            return {
                _key: '',
                error: e.toString(),
            };
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
        try {
            return await this.model.merchant.update(mid, merchantMessage);
        } catch (e) {
            return {
                _key: '',
                error: e.toString(),
            };
        }
    }

    /**
     * 选择店铺---根据店铺ID删除对应的店铺
     * @param {string} mid
     * @returns {Promise<void>}
     */
    public async deleteMerchant(mid: string) {
        return await this.model.merchant.remove(mid);
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
        let users;
        users = merchant.user_ids;
        let allUserMessage;
        allUserMessage = [];
        if (users !== undefined && users.length !== 0) {
            for (let u = 0; u < users.length; u++) {
                const user = await this.model.user[users[u]];
                allUserMessage.push(user);
            }
            return allUserMessage;
        }else {
            return null;
        }
    }

    /**
     * 根据店铺ID和日期获取店铺今日收入和退款金额
     * @param {string} mid
     * @param {string} nowTime
     * @returns {Promise<any>}
     */
    public async getOrderIncomeAndRefond(mid: string, nowTime: string) {
        const merchant = await this.model.merchant[mid];
        let orders;
        orders = merchant.order_ids;
        let incomeCount;
        let refondCount;
        incomeCount = 0;
        refondCount = 0;
        if (orders !== undefined && orders.length !== 0) {
            for (let o = 0; o < orders.length; o++) {
                const order = await this.model.order[orders[o]];
                if (order.status === 5 && nowTime === order.expense_date) {
                    incomeCount += order.paid;
                }
                if (order.status === 8 && nowTime === order.expense_date) {
                    refondCount += order.paid;
                }
            }
            return {
                order_income: incomeCount,
                order_refond: refondCount,
            };
        }else {
            return {
                order_income: 0,
                order_refond: 0,
            };
        }
    }
}
