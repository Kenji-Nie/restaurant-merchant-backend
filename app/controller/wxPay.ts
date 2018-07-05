import BaseController from './base';

export default class WxPayController extends BaseController {
    /**
     * GET /api/v1/payment
     */
    public async index() {
        console.log(this.app.config.secrets)
        this.ctx.body = 'hello';
    }

    /**
     * GET /api/v1/payment/wx-pay/new
     */
    public async new() {
        ;
    }

    /**
     * GET /api/v1/payment/wx-pay/:id
     */
    public async show() {
        ;
    }

    /**
     * GET /api/v1/payment/wx-pay/:id/edit
     */
    public async edit() {
        ;
    }

    /**
     * PUT /api/v1/payment/wx-pay/:id
     */
    public async update() {
        ;
    }

    /**
     * DELETE /api/v1/payment/wx-pay/:id
     */
    public async destroy() {
        ;
    }

    /**
     * POST /api/v1/payment/wx-pay/
     */
    public async create() {
        // ctx.validate(createRule);
        const params = this.ctx.request.body;
        params['spbill_create_ip'] = this.ctx.ip;
        const raw = await this.service.wxPay.prePay(params);
        return this.service.wxPay.generateResponse(raw.data.xml, params);
    }
}
