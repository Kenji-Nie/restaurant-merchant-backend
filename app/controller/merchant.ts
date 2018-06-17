import BaseController from './base';

export default class MerchantController extends BaseController {

    // public async addAuthentication() {
    //     const params = this.ctx.request.body;
    //     const result = await this.service.merchant.addMerchant(params);
    //     this.ctx.body = {
    //         message: result,
    //         status: !(result._key === ''),
    //     };
    // }

    public async getAuthenticationData() {
        const params = this.ctx.query;
        this.ctx.body = {
            message: await this.service.merchant.get(params.merchant_id),
            status: true,
        };
    }
}
