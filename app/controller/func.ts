import BaseController from './base';

export default class FuncController extends BaseController {

    public async getMenuList() {
        const menus = await this.service.func.getMenus();
        this.ctx.body = {
            message: menus,
            status: true,
        };
    }
}
