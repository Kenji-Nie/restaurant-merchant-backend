import BaseController from './base';

export default class MerchandiseTypeController extends BaseController {

    public async addGroup() {
        const params = this.ctx.request.body;
        const result = await this.service.merchandiseType.addMerchandiseType(
            params.merchant_id, params.merchandise_type_name, params.merchandise_type_icon);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }

    public async group() {
        const param = this.ctx.params.rest;
        this.ctx.body = {
            message: await this.service.merchandiseType.getMerchandiseTypesByMerchantId(param),
            status: true,
        };
    }

    public async modify() {
        const params = this.ctx.request.body;
        const result = await this.service.merchandiseType.modifyMerchandiseType(params._key, params);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }

    public async delete() {
        const param = this.ctx.params.rest;
        const result = await this.service.merchandiseType.deleteMerchandiseType(param);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }
}
