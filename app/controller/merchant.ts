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
        const merchantDetail = await this.ctx.request.body.merchantMessage;
        const result = await this.ctx.service.merchant.updateMerchant(merchantId, merchantDetail);
        if (result != null) {
            this.ctx.body = {
                status: true,
                message: merchantDetail,
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
    public async listMerchantUser() {
        const merchantId = await this.ctx.request.body.id;
        const users = await this.ctx.service.merchant.listMerchantUser(merchantId);
        if (users !== null) {
            this.ctx.body = {
                status: true,
                message: users,
                countPeople: users.length,
            };
        }else {
            this.ctx.body = {
                status: false,
                message: null,
                countPeople: 0,
            };
        }
    }
    public async getOrderIncomeAndRefond() {
        const merchantId = await this.ctx.request.body.id;
        const nowTime = await this.ctx.request.body.nowTime;
        const inAndOut = await this.ctx.service.merchant.getOrderIncomeAndRefond(merchantId, nowTime);
        if (inAndOut.order_income !== 0 || inAndOut.order_refond !== 0) {
            this.ctx.body = {
                status: true,
                message: inAndOut,
            };
        }else {
            this.ctx.body = {
                status: false,
                message: inAndOut,
            };
        }
    }
}
