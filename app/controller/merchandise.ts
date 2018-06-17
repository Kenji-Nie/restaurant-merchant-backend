import BaseController from './base';

export default class MerchandiseController extends BaseController {

    public async addCommodity() {
        const params = this.ctx.request.body;
        const result = await this.service.merchandise.addMerchandise(params);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }

    public async getCommodityData() {
        const params = this.ctx.params;
        this.ctx.body = {
            message: await this.service.merchandise.getMerchandiseByMerchantId(params.merchant_id),
            status: true,
        };
    }

    public async modifyCommodity() {
        const params = this.ctx.request.body;
        const result = await this.service.merchandise.modifyMerchandise(params._key, params);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }

    public async modifyShelf() {
        const params = this.ctx.params;
        const newObj = Object.assign(
            {}, await this.service.merchandise.get(params.merchandise_id), {shelf_flag: !params.shelf_flag});
        const result = await this.service.merchandise.modifyMerchandise(params._key, newObj);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }

    public async deleteCommodity() {
        const params = this.ctx.params;
        const result = await this.service.merchandise.deleteMerchandise(params.merchandise_id);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }
}
