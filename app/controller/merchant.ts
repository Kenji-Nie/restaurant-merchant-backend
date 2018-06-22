import BaseController from './base';

export default class MerchantController extends BaseController {

    public async add() {
        const params = this.ctx.request.body;
        const result = await this.service.merchant.addMerchant(params);
        this.ctx.body = {
            message: result,
            status: !(result._key === ''),
        };
    }

    public async get() {
        const params = this.ctx.query;
        const param = this.ctx.params.rest;
        this.ctx.body = {
            message: await this.service.merchant.get(param),
            status: true,
        };
    }

    public async updateMerchant() {
        const merchantId = this.ctx.request.body.merchant_id;
        const merchantMessage = this.ctx.request.body.merchantMessage;
        const result = await this.service.merchant.updateMerchant(merchantId, merchantMessage);
        if (result != null) {
            this.ctx.body = {
                status: true,
                message: merchantMessage,
            };
        }else {
            this.ctx.body = {
                status: false,
                message: null,
            };
        }
    }

    public async deleteMerchant() {
        const merchantId = this.ctx.request.body.merchant_id;
        const result = await this.ctx.service.merchant.deleteMerchant(merchantId);
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

    public async listMerchantUser() {
        const merchantId = this.ctx.request.body.merchant_id;
        const users = await this.ctx.service.merchant.listMerchantUser(merchantId);
        if (users !== null) {
            this.ctx.body = {
                status: true,
                message: users,
                countPeople: users.length,
            };
        } else {
            this.ctx.body = {
                status: false,
                message: null,
                countPeople: 0,
            };
        }
    }

    public async getOrderIncomeAndRefond() {
        const merchantId = this.ctx.request.body.merchant_id;
        const nowTime = this.ctx.request.body.nowTime;
        const inAndOut = await this.ctx.service.merchant.getOrderIncomeAndRefond(merchantId, nowTime);
        if (inAndOut.order_income !== 0 || inAndOut.order_refond !== 0) {
            this.ctx.body = {
                status: true,
                message: inAndOut,
            };
        } else {
            this.ctx.body = {
                status: false,
                message: inAndOut,
            };
        }
    }

    /**
     * 根据店铺ID修改最低起送金额
     * @returns {Promise<void>}
     */
    public async updateTakeoutAmount() {
        try {
            const merchant = await this.ctx.service.merchant.updateTakeoutAmount(this.ctx.request.body.merchant_id, this.ctx.request.body.min_takeaway_amount);
            this.ctx.body = {
                status: true,
                message: {
                    merchant
                }
            }
        }
        catch (e) {
            this.ctx.body = {
                status: false,
                message: {
                    seats: []
                }
            }

        }
    }


    /**
     * 根据店铺ID修改预约锁定时间
     * @returns {Promise<void>}
     */
    public async updateReservedLockTime() {
        try {
            const merchant = await this.ctx.service.merchant.updateReservedLockTime(this.ctx.request.body.merchant_id, this.ctx.request.body.reservd_lock_time);
            this.ctx.body = {
                status: true,
                message: {
                    merchant
                }
            }
        }
        catch (e) {
            this.ctx.body = {
                status: false,
                message: {
                    seats: []
                }
            }

        }
    }
}
