import BaseController from './base';

export default class UserController extends BaseController {

    public async login() {
        const user = await this.service.user.findUserByPhoneAndPassword(
            this.ctx.request.body.phone, this.ctx.request.body.password);
        if (user != null) {
            this.ctx.body = {
                status: true,
                message: {
                    uid: user._key,
                },
            };
        } else {
            this.ctx.body = {
                status: false,
                message: {
                    uid: '',
                },
            };
        }
    }
}
