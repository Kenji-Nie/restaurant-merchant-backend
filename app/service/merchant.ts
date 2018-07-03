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
        const merchant = await this.model.merchant[mid];
        try {
            if (merchant.merchandise_ids !== undefined) {
                for (const merchandiseId of merchant.merchandise_ids) {
                    await this.model.merchandise.remove(merchandiseId);
                }
            }
            if (merchant.merchandiseType_ids !== undefined) {
                for (const merchandiseTypeId of merchant.merchandiseType_ids) {
                    await this.model.merchandiseType.remove(merchandiseTypeId);
                }
            }
            if (merchant.coupon_ids !== undefined) {
                for (const couponId of merchant.coupon_ids) {
                    await this.model.coupon.remove(couponId);
                }
            }
            if (merchant.seat_ids !== undefined) {
                for (const saetId of merchant.seat_ids) {
                    await this.model.seat.remove(saetId);
                }
            }
            if (merchant.seatType_ids !== undefined) {
                for (const saetTypeId of merchant.seatType_ids) {
                    await this.model.seatType.remove(saetTypeId);
                }
            }
            if (merchant.ad_ids !== undefined) {
                for (const adId of merchant.ad_ids) {
                    await this.model.ad.remove(adId);
                }
            }
            if (merchant.role_ids !== undefined) {
                for (const roleId of merchant.role_ids) {
                    await this.model.role.remove(roleId);
                }
            }
            if (merchant.icon_ids !== undefined) {
                for (const iconId of merchant.icon_ids) {
                    await this.model.role.remove(iconId);
                }
            }
            const result = await this.model.merchant.remove(mid);
            return {
                message: result,
                status: true,
            };
        } catch (e) {
            return {
                error: e.toString(),
                status: false,
                message: {
                    _key: '',
                },
            };
        }
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
        } else {
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
        } else {
            return {
                order_income: 0,
                order_refond: 0,
            };
        }
    }

    /**
     * 根据店铺ID修改最低起送金额
     * @param {string} merchant_id
     * @param {number} min_takeaway_amount
     * @returns {Promise<any>}
     */
    public async updateTakeoutAmount(merchant_id: string, min_takeaway_amount: number) {
        return this.model.merchant.update(merchant_id, {min_takeaway_amount});
    }

    /**
     * 根据店铺ID修改预约锁定时间
     * @param {string} merchant_id
     * @param {number} reservd_lock_time
     * @returns {Promise<any>}
     */
    public async updateReservedLockTime(merchant_id: string, reservd_lock_time: number) {
        return this.model.merchant.update(merchant_id, {reservd_lock_time});
    }

    /**
     * 根据商户merchant_id获取针对该商家的所有优惠卷数据
     * @param {string} mid
     * @returns {Promise<any>}
     */
    public async getMerchantCoupon(mid: string) {
        const merchant = await this.model.merchant[mid];
        const coupons = merchant.coupon_ids;
        let allCouponMessage;
        allCouponMessage = [];
        if (coupons !== undefined && coupons.length !== 0) {
            for (let c = 0; c < coupons.length; c++) {
                const coupon = await this.model.coupon[coupons[c]];
                allCouponMessage.push(coupon);
            }
            return allCouponMessage;
        }else {
            return null;
        }
    }

    /**
     * 根据店铺id获取店铺信息
     * @param {string} mid
     * @returns {Promise<void>}
     */
    public async getMerchant(mid: string) {
        const merchant = await this.model.merchant[mid];
        const orderIds = merchant.order_ids;
        let orderMessages;
        orderMessages = [];
        if (orderIds !== undefined && orderIds.length !== 0) {
            for (let i = 0; i < orderIds.length; i++) {
                const order = await this.model.order[orderIds[i]];
                orderMessages.push(order);
            }
        }
        const couponIds = merchant.coupon_ids;
        let couponMessages;
        couponMessages = [];
        if (couponIds !== undefined && couponIds.length !== 0) {
            for (let i = 0; i < couponIds.length; i++) {
                const coupon = await this.model.coupon[couponIds[i]];
                couponMessages.push(coupon);
            }
        }
        const merchandiseIds = merchant.merchandise_ids;
        let merchandiseMessages;
        merchandiseMessages = [];
        if (merchandiseIds !== undefined && merchandiseIds.length !== 0) {
            for (let i = 0; i < merchandiseIds.length; i++) {
                const merchandise = await this.model.merchandise[merchandiseIds[i]];
                merchandiseMessages.push(merchandise);
            }
        }
        const userIds = merchant.user_ids;
        let userMessages;
        userMessages = [];
        if (userIds !== undefined && userIds.length !== 0) {
            for (let i = 0; i < userIds.length; i++) {
                const user = await this.model.user[userIds[i]];
                userMessages.push(user);
            }
        }
        const merchandiseTypeIds = merchant.merchandiseType_ids;
        let merchandiseTypeMessages;
        merchandiseTypeMessages = [];
        if (merchandiseTypeIds !== undefined && merchandiseTypeIds.length !== 0) {
            for (let i = 0; i < merchandiseTypeIds.length; i++) {
                const merchandiseType = await this.model.merchandiseType[merchandiseTypeIds[i]];
                merchandiseTypeMessages.push(merchandiseType);
            }
        }
        const seatIds = merchant.seat_ids;
        let seatMessages;
        seatMessages = [];
        if (seatIds !== undefined && seatIds.length !== 0) {
            for (let i = 0; i < seatIds.length; i++) {
                const seat = await this.model.seat[seatIds[i]];
                seatMessages.push(seat);
            }
        }
        const seatTypeIds = merchant.seatType_ids;
        let seatTypeMessages;
        seatTypeMessages = [];
        if (seatTypeIds !== undefined && seatTypeIds.length !== 0) {
            for (let i = 0; i < seatTypeIds.length; i++) {
                const seatType = await this.model.seatType[seatTypeIds[i]];
                seatTypeMessages.push(seatType);
            }
        }
        const adIds = merchant.ad_ids;
        let adMessages;
        adMessages = [];
        if (adIds !== undefined && adIds.length !== 0) {
            for (let i = 0; i < adIds.length; i++) {
                const ad = await this.model.ad[adIds[i]];
                adMessages.push(ad);
            }
        }
        const roleIds = merchant.role_ids;
        let roleMessages;
        roleMessages = [];
        if (roleIds !== undefined && roleIds.length !== 0) {
            for (let i = 0; i < roleIds.length; i++) {
                const role = await this.model.role[roleIds[i]];
                roleMessages.push(role);
            }
        }
        const themeIds = merchant.theme_ids;
        let themeMessages;
        themeMessages = [];
        if (themeIds !== undefined && themeIds.length !== 0) {
            for (let i = 0; i < themeIds.length; i++) {
                const theme = await this.model.theme[themeIds[i]];
                themeMessages.push(theme);
            }
        }
        const iconIds = merchant.icon_ids;
        let iconMessages;
        iconMessages = [];
        if (iconIds !== undefined && iconIds.length !== 0) {
            for (let i = 0; i < iconIds.length; i++) {
                const icon = await this.model.icon[iconIds[i]];
                iconMessages.push(icon);
            }
        }
        return  {merchantMessage: merchant, merchandise_ids: merchandiseMessages, user_ids: userMessages, merchandiseType_ids: merchandiseTypeMessages, coupon_ids: couponMessages, order_ids: orderMessages, seat_ids: seatMessages, seatType_ids: seatTypeMessages, ad_ids: adMessages, role_ids: roleMessages, theme_ids: themeMessages, icon_ids: iconMessages};
    }
}
