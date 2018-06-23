import BaseController from './base';

export default class MerchandiseController extends BaseController {

    public async add() {
        const params = this.ctx.request.body;
        const result = await this.service.merchandise.add(params.merchant_id, params.merchandise);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }

    public async get() {
        const param = this.ctx.params.rest;
        this.ctx.body = {
            message: await this.service.merchandise.getMerchandiseByMerchantId(param),
            status: true,
        };
    }

    public async modify() {
        const params = this.ctx.request.body;
        const result = await this.service.merchandise.modifyMerchandise(params._key, params);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }

    public async shelf() {
        const param = this.ctx.request.body.ids;
        const result = await this.service.merchandise.shelfMerchandise(param.ids);
        this.ctx.body = result;
    }

    public async delete() {
        const param = this.ctx.request.body;
        const result = await this.service.merchandise.deleteMerchandise(param.ids);
        this.ctx.body = result;
    }
}
