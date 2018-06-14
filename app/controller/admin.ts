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
    public async getAdminId() {
        const phone = await this.ctx.request.body.phone;
        const password = await this.ctx.request.body.password;
        const yanZhengMa = await this.ctx.request.body.YanZhengMa;
        const adminId = await this.service.admin.getAdminId( phone, password, yanZhengMa );
        if ( adminId != null ) {
            this.ctx.body = {
                status: true,
                message: {
                    admin_id: adminId,
                },
            };
        }else {
            this.ctx.body = {
                status: false,
                message: {
                    admin_id: null,
                },
            };
        }
    }
}
