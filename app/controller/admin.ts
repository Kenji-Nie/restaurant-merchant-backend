import BaseController from './base';

export default class AdminController extends BaseController {
    public async getAdminDetail() {
        const adminId = this.ctx.request.body.admin_id;
        const detail = await this.service.admin.getAdminDetail(adminId);
        if (detail != null) {
            this.ctx.body = detail;
        }else {
            this.ctx.body = null;
        }
    }
}
