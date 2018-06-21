import BaseController from './base';

export default class MerchandiseController extends BaseController {

    public async add() {
        const params = this.ctx.request.body;
        const result = await this.service.merchandise.addMerchandise(params);
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
        const param = this.ctx.params.rest;
        const oldObj = await this.service.merchandise.get(param);
        const shelfFlag: boolean =  (oldObj.shelf_flag === undefined) ? false : oldObj.shelf_flag;
        const newObj = Object.assign(
            {}, oldObj, {shelf_flag: !shelfFlag});
        const result = await this.service.merchandise.modifyMerchandise(param, newObj);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }

    public async delete() {
        const param = this.ctx.params.rest;
        const result = await this.service.merchandise.deleteMerchandise(param);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }
}
