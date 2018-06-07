import BaseController from './base';

export default class HomeController extends BaseController {

    public async index() {
        this.ctx.body = await this.service.home.index();
    }
}