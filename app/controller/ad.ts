import BaseController from './base';

export default class AdController extends BaseController {

    public async list() {
        const param = this.ctx.params.rest;
        this.ctx.body = {
            message: await this.service.ad.getAdByMerchantId(param),
            status: true,
        };
    }

    public async add() {
        const params = this.ctx.request.body;
        const result = await this.service.ad.add(params.merchant_id, params.ads);
        this.ctx.body = {
            status: result,
        };
    }

    public async update() {
        const params = this.ctx.request.body;
        const result = await this.service.ad.modify(params._key, params);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }
}
