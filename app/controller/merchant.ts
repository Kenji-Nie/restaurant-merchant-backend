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
    public async updateMerchant() {
        const merchantId = await this.ctx.request.body.id;
        const storeMessage = await this.ctx.request.body;
        const result = await this.ctx.service.merchant.updateMerchant(merchantId, storeMessage);
        if (result != null) {
            this.ctx.body = {
                status: true,
                message: storeMessage,
            };
        }else {
            this.ctx.body = {
                status: false,
                message: null,
            };
        }
    }
    public async deleteMerchant() {
        const merchantId = await this.ctx.request.body.id;
        const result = await this.ctx.service.merchant.deleteMerchant(merchantId);
        if (result != null) {
            this.ctx.body = {
                status: true,
            };
        }else {
            this.ctx.body = {
                status: false,
            };
        }
    }
}
