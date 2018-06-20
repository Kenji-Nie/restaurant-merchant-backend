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
                    user: user,
                },
            };
        } else {
            this.ctx.body = {
                status: false,
                message: {
                    user: null,
                },
            };
        }
    }
    public async getYanZhengMa() {
        const phone = await this.ctx.request.body.phone;
        const yanZhengMa = await this.service.user.getYanZhengMa(phone);
        this.ctx.body = {
            status: true,
            message: {
                YanZhengMa: yanZhengMa,
            },
        };
    }
    public async forgetPassword() {
        const phone = await this.ctx.request.body.phone;
        const password = await this.ctx.request.body.password;
        const yanZhengMa = await this.ctx.request.body.YanZhengMa;
        const userId = await this.service.user.forgetPassword(phone, password, yanZhengMa);
        if (userId != null) {
            this.ctx.body = {
                status: true,
                message: {
                    id: userId._key,
                },
            };
        }else {
            this.ctx.body = {
                status: false,
                message: null,
            };
        }
    }
    public async updateUserDetail() {
        const userId = await this.ctx.request.body.id;
        const userDetail = await this.ctx.request.body.userMessage;
        const result = await this.ctx.service.user.updateUserDetail(userId, userDetail);
        if (result != null) {
            this.ctx.body = {
                status: true,
                message: userDetail,
            };
        }else {
            this.ctx.body = {
                status: false,
                message: null,
            };
        }
    }
    public async createMerchant() {
        const userId = await this.ctx.request.body.id;
        const merchantDetail = await this.ctx.request.body.merchantMessage;
        const result = await this.ctx.service.user.createMerchant(userId, merchantDetail);
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
    public async updatePassword() {
        const userId = await this.ctx.request.body.id;
        const userOldPassword = await this.ctx.request.body.oldPassword;
        const userNewPassword = await this.ctx.request.body.newPassword;
        const result = await this.ctx.service.user.updatePassword(userId, userOldPassword, userNewPassword);
        if ( result !== 0 ) {
           this.ctx.body = {
               status: true,
           };
        }else {
            this.ctx.body = {
                status: false,
            };
        }
    }
    public async getUserId() {
        const phone = await this.ctx.request.body.phone;
        const password = await this.ctx.request.body.password;
        const yanZhengMa = await this.ctx.request.body.YanZhengMa;
        const userId = await this.service.user.forgetPassword(phone, password, yanZhengMa);
        if (userId != null) {
            this.ctx.body = {
                status: true,
                message: {
                    id: userId._key,
                },
            };
        }else {
            this.ctx.body = {
                status: false,
                message: null,
            };
        }
    }
    public async listMerchant() {
        const userId = await this.ctx.request.body.id;
        const merchants = await this.ctx.service.user.listMerchant(userId);
        if (merchants != null) {
            this.ctx.body = {
                status: true,
                message: merchants,
            };
        } else {
            this.ctx.body = {
                status: false,
                message: null,
            };
        }
    }
    public async modifyRemark() {
        const userIds = this.ctx.request.body.ids.toString();
        const remark = await this.ctx.request.body.remark;
        const result = await this.ctx.service.user.modifyRemark(userIds.split(','), remark);
        if (result) {
            this.ctx.body = {
                status: true,
                message: '修改成功',
            };
        }else {
            this.ctx.body = {
                status: false,
                message: '修改失败',
            };
        }
    }
    public async addUserCoupon() {
        const userId = await this.ctx.request.body.user_id;
        const couponId = await this.ctx.request.body.coupon_id;
        const result = await this.ctx.service.user.addUserCoupon(userId, couponId);
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
    public async getUserCoupon() {
        const userId = await this.ctx.request.body.id;
        const coupons = await this.ctx.service.user.getUserCoupon(userId);
        if (coupons !== null) {
            this.ctx.body = {
                user_id: userId,
                message: coupons,
            };
        }else {
            this.ctx.body = {
                user_id: userId,
                message: null,
            };
        }
    }
}
