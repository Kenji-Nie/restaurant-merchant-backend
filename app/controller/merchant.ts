import BaseController from './base';

export default class MerchantController extends BaseController {

    public async addAuthentication() {
        const params = this.ctx.request.body;
        const result = await this.service.merchant.addMerchant(params);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }

    public async getAuthenticationData() {
        const params = this.ctx.query;
        this.ctx.body = {
            message: await this.service.merchant.get(params.merchant_id),
            status: true,
        };
    }
    public async getMerchantsByAdminId() {
        const aid = await this.ctx.request.body.admin_id;
        const merchants = await this.ctx.service.merchant.getMerchantsByAdminId(aid);
        if (merchants != null) {
            this.ctx.body = {
                status: true,
                message: merchants,
            };
        } else {
            this.ctx.body = {
                status: false,
                message: null,
            };
        }
    }
}
