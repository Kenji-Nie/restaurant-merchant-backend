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
        if (result) {
            this.ctx.body = {
                status: true,
                merchant_id: result,
                message: merchantDetail,
            };
        } else {
            this.ctx.body = {
                status: false,
                merchant_id: '',
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
        const userIds = this.ctx.request.body.user_ids.toString();
        const couponIds = this.ctx.request.body.coupon_ids.toString();
        const result = await this.ctx.service.user.addUserCoupon(userIds.split(','), couponIds.split(','));
        if (result != null) {
            this.ctx.body = {
                status: true,
                usernames: result,
            };
        } else {
            this.ctx.body = {
                status: false,
                usernames: '',
            };
        }
    }

    public async getUserCoupon() {
        const userId = this.ctx.request.body.user_id;
        const result = await this.ctx.service.user.getUserCoupon(userId);
        if (result !== null) {
            this.ctx.body = {
                user_id: userId,
                message: result,
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
    public async getUser() {
        try {
            const user = await this.ctx.service.user.getUser(this.ctx.request.body.wx_uid);
            this.ctx.body = {
                status: true,
                message: user,
            };
        }catch (e) {
            this.ctx.body = {
                status: false,
                message: '',
            };
        }
        /*const user = await this.ctx.service.user.getUser(this.ctx.request.body.wx_uid);
        if ( user != null) {
            this.ctx.body = {
                status: true,
                message: user,
            };
        }else {
            this.ctx.body = {
                status: false,
                message: '',
            };
        }*/
    }

    public async addPhone() {
        try {
            await this.ctx.service.user.addPhone(this.ctx.request.body.phone, this.ctx.request.body.user_id, this.ctx.request.body.YanZhengMa);
            this.ctx.body = {
                status: true,
            };
        } catch (e) {
            this.ctx.body = {
                status: false,
            };
        }
    }

    public async addAddress() {
        try {
            const addressId = await this.ctx.service.user.addAddress(this.ctx.request.body.user_id, this.ctx.request.body.addressMessage);
            this.ctx.body = {
                status: true,
                address_id: addressId,
            };
        } catch (e) {
            this.ctx.body = {
                status: false,
                address_id: '',
            };
        }
    }

    public async updateAddress() {
        try {
            const result = await this.ctx.service.user.updateAddress(this.ctx.request.body.user_id, this.ctx.request.body.address_id, this.ctx.request.body.addressMessage);
            this.ctx.body = {
                status: true,
            };
        } catch (e) {
            this.ctx.body = {
                status: false,
            };
        }
    }

    public async deleteAddress() {
        try {
            await this.ctx.service.user.deleteAddress(this.ctx.request.body.user_id, this.ctx.request.body.address_id);
            this.ctx.body = {
                status: true,
            };
        } catch (e) {
            this.ctx.body = {
                status: false,
            };
        }
    }

    public async deleteOrder() {
        try {
            await this.ctx.service.user.deleteOrder(this.ctx.request.body.user_id, this.ctx.request.body.merchant_id, this.ctx.request.body.order_id);
            this.ctx.body = {
                status: true,
            };
        } catch (e) {
            this.ctx.body = {
                status: false,
            };
        }
    }

    public async addOrder() {
        try {
            const order = await this.ctx.service.user.addOrder(this.ctx.request.body.user_id, this.ctx.request.body.merchant_id, this.ctx.request.body.orderMessage);
            this.ctx.body = {
                status: true,
                order_id: order,
            };
        } catch (e) {
            this.ctx.body = {
                status: false,
                order_id: '',
            };
        }
    }

    public async addCoupon() {
        try {
            const result = await this.ctx.service.user.addCoupon(this.ctx.request.body.user_id, this.ctx.request.body.coupon_id);
            this.ctx.body = {
                status: true,
            };
        } catch (e) {
            this.ctx.body = {
                status: false,
            };
        }
    }
}
