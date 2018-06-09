import BaseController from './base';

export default class MerchandiseTypeController extends BaseController {

    public async addGroup() {
        const params = this.ctx.request.body;
        this.service.merchandiseType.addGroup(params.merchandise_type_name, params.merchandise_type_icon);
        this.ctx.body = {status: true};
    }
}