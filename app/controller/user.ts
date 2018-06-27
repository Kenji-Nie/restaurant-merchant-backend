import BaseController from './base';

export default class UserController extends BaseController {
    public async findUserById() {
        const userId = this.ctx.request.body.user_id;
        const user = await this.ctx.service.user.findUserById(userId);
        if (user != null) {
            this.ctx.body = {
                status: true,
                message: user,
            };
        } else {
            this.ctx.body = {
                status: false,
                message: null,
            };
        }
    }

    public async findUserByPhoneAndPassword() {
        const phone = this.ctx.request.body.phone;
        const password = this.ctx.request.body.password;
        const user = await this.ctx.service.user.findUserByPhoneAndPassword(phone, password);
        if (user.length !== 0) {
            this.ctx.body = {
                status: true,
                message: {
                    user: user,
                },
            };
        } else {
            this.ctx.body = {
                status: false,
                message: null,
            };
        }
        /*let userMessage;
        userMessage = [];
        if (user != null && user.length !== 0) {
            if (user.length === 1) {
                this.ctx.body = {
                    status: true,
                    message: {
                        user: user[0],
                    },
                };
            }else {
                for (let u = 0; u < user.length; u++) {
                    userMessage.push(user[u]);
                }
                this.ctx.body = {
                    status: true,
                    message: {
                        user: userMessage,
                    },
                };
            }
        } else {
            this.ctx.body = {
                status: false,
                message: null,
            };
        }*/
    }

    public async findUserByEmail() {
        const email = this.ctx.request.body.email;
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
        const phone = this.ctx.request.body.phone;
        const yanZhengMa = await this.service.user.getYanZhengMa(phone);
        this.ctx.body = {
            status: true,
            message: {
                YanZhengMa: yanZhengMa,
            },
        };
    }

    public async forgetPassword() {
        const phone = this.ctx.request.body.phone;
        const password = this.ctx.request.body.password;
        const yanZhengMa = this.ctx.request.body.YanZhengMa;
        const userMessage = await this.service.user.forgetPassword(phone, password, yanZhengMa);
        let userId;
        userId = [];
        if (userMessage != null && userMessage.length !== 0) {
            if (userMessage.length === 1) {
                this.ctx.body = {
                    status: true,
                    message: {
                        id: userMessage[0]._key,
                    },
                };
            } else {
                for (let u = 0; u < userMessage.length; u++) {
                    userId.push(userMessage[u]._key);
                }
                this.ctx.body = {
                    status: true,
                    message: {
                        id: userId,
                    },
                };
            }
        } else {
            this.ctx.body = {
                status: false,
                message: null,
            };
        }
    }

    public async updateUserDetail() {
        const userId = this.ctx.request.body.user_id;
        const userDetail = this.ctx.request.body.userMessage;
        const result = await this.ctx.service.user.updateUserDetail(userId, userDetail);
        if (result != null) {
            this.ctx.body = {
                status: true,
                message: userDetail,
            };
        } else {
            this.ctx.body = {
                status: false,
                message: null,
            };
        }
    }

    public async createMerchant() {
        const userId = this.ctx.request.body.user_id;
        const merchantDetail = this.ctx.request.body.merchantMessage;
        const result = await this.ctx.service.user.createMerchant(userId, merchantDetail);
        if (result != null) {
            this.ctx.body = {
                status: true,
                message: merchantDetail,
            };
        } else {
            this.ctx.body = {
                status: false,
                message: null,
            };
        }
    }

    public async updatePassword() {
        const userId = this.ctx.request.body.user_id;
        const userOldPassword = this.ctx.request.body.oldPassword;
        const userNewPassword = this.ctx.request.body.newPassword;
        const result = await this.ctx.service.user.updatePassword(userId, userOldPassword, userNewPassword);
        if (result !== 0) {
            this.ctx.body = {
                status: true,
            };
        } else {
            this.ctx.body = {
                status: false,
            };
        }
    }

    public async userRegister() {
        const yanZhengMa = this.ctx.request.body.YanZhengMa;
        const userMessage = this.ctx.request.body.userMessage;
        const userLogin = await this.service.user.userRegister(yanZhengMa, userMessage);
        if (userLogin != null) {
            this.ctx.body = {
                status: true,
                message: {
                    user_id: userLogin._key,
                },
            };
        } else {
            this.ctx.body = {
                status: false,
                message: {
                    user_id: '',
                },
            };
        }
    }

    public async listMerchant() {
        // const userId = this.ctx.request.body.user_id;
        // const merchants = await this.ctx.service.user.listMerchant(userId);
        try {
            const merchants = (await this.ctx.service.user.listMerchant(this.ctx.request.body.user_id)).merchants;
            this.ctx.body = {
                status: true,
                message: merchants,
            };
        } catch (e) {
            this.ctx.body = {
                status: false,
                message: null,
            };
        }
    }

    public async modifyRemark() {
        const userIds = this.ctx.request.body.user_ids.toString();
        const remark = this.ctx.request.body.remark;
        const result = await this.ctx.service.user.modifyRemark(userIds.split(','), remark);
        if (result) {
            this.ctx.body = {
                status: true,
                message: '修改成功',
            };
        } else {
            this.ctx.body = {
                status: false,
                message: '修改失败',
            };
        }
    }

    public async addUserCoupon() {
        const userId = this.ctx.request.body.user_id;
        const couponId = this.ctx.request.body.coupon_id;
        const result = await this.ctx.service.user.addUserCoupon(userId, couponId);
        if (result != null) {
            this.ctx.body = {
                status: true,
            };
        } else {
            this.ctx.body = {
                status: false,
            };
        }
    }

    public async getUserCoupon() {
        const userId = this.ctx.request.body.user_id;
        const coupons = await this.ctx.service.user.getUserCoupon(userId);
        if (coupons !== null) {
            this.ctx.body = {
                user_id: userId,
                message: coupons,
            };
        } else {
            this.ctx.body = {
                user_id: userId,
                message: null,
            };
        }
    }

    public async getOrder() {
        const userId = this.ctx.request.body.user_id;
        const orders = await this.ctx.service.user.getOrder(userId);
        if (orders != null) {
            this.ctx.body = {
                message: orders,
            };
        } else {
            this.ctx.body = {
                message: null,
            };
        }
    }
}
