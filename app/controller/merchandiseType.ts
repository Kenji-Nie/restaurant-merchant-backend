import BaseController from './base';

export default class MerchandiseTypeController extends BaseController {

    public async addGroup() {
        const params = this.ctx.request.body;
        const result = await this.service.merchandiseType.addMerchandiseType(
            params.merchandise_type_name, params.merchandise_type_icon);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }

    public async getGroupData() {
        const params = this.ctx.params;
        this.ctx.body = {
            message: await this.service.merchandiseType.getMerchandiseTypesByMerchantId(params.user_id),
            status: true,
        };
    }

    public async modifyGroup() {
        const params = this.ctx.request.body;
        const result = await this.service.merchandiseType.modifyMerchandiseType(params._key, params);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }
}
