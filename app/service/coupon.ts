import BaseService from './base';
import Coupon = model.schema.Coupon;

export default class MerchandiseService extends BaseService {
    public async add(mid: string, coup: Coupon) {
        let newCouponId;
        try {
            newCouponId = await this.model.coupon.save(coup);
        } catch (e) {
            return {
                _key: '',
                error: e.toString(),
            };
        }
        const merchant = await this.service.merchant.get(mid);
        if (merchant.coupon_ids === undefined) {
            merchant.coupon_ids = [newCouponId._key];
        } else {
            merchant.coupon_ids.push(newCouponId._key);
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
    public async modify(couId: string, coup: Coupon) {
        try {
            return await this.model.coupon.update(couId, coup);
        } catch (e) {
            return {_key: ''};
        }
    }

    public async delete(couId: string) {
        try {
            return await this.model.coupon.remove(couId);
        } catch (e) {
            return {_key: ''};
        }
    }

    public async getCouponByMerchantId(mid: string) {
        const merchant = await (await this.service.merchant.findMerchantAndCouponById(mid)).next();
        return merchant === undefined ? [] : merchant.coupons;
    }
}
