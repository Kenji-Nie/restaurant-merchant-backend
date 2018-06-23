import BaseController from './base';

export default class CouponController extends BaseController {

    public async add() {
        const params = this.ctx.request.body;
        const result = await this.service.coupon.add(params.merchant_id, params.coupon);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }

    public async get() {
        const param = this.ctx.params.rest;
        this.ctx.body = {
            message: await this.service.coupon.getCouponByMerchantId(param),
            status: true,
        };
    }

    public async modify() {
        const params = this.ctx.request.body;
        const result = await this.service.coupon.modify(params._key, params);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }

    public async delete() {
        const param = this.ctx.params.rest;
        const result = await this.service.coupon.delete(param);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }
}
