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


    public async findUserByEmail() {
        const email = await this.ctx.request.body.email;
        const user = await (await this.service.user.findUserByEmail(email)).next();
        if (user != null) {
            this.ctx.body = {
                status: true,
                message: {
                    user: user
                }
            }
        } else {
            this.ctx.body = {
                status: false,
                message: {
                    user: null
                }
            }
        }
    }

}
