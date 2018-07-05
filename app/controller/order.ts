import BaseController from './base';
import ArrayUtils from "../utils/arrayUtils";

export default class OrderController extends BaseController {

    public async getPurchaseRecord() {
        const params = this.ctx.params;
        this.ctx.body = {
            message: await this.service.order.getOrdersByUserId(params.user_id),
            status: true,
        };
    }

    /**
     * 根据订单ID批量修改订单状态
     * @returns {Promise<void>}
     */
    public async updateOrderStatus() {
        const ids = this.ctx.request.body.order_ids.toString().split(',');
        this.ctx.body = {
            status: await this.service.order.updateOrderStatus((await ArrayUtils.numberToString(ids)), this.ctx.request.body.status)
        }
    }

    /**
     * 根据商户ID查询所有堂食订单
     * @returns {Promise<void>}
     */
    public async listEatinOrder() {
        try {
            const orders = await (await this.service.order.listEatinOrder(this.ctx.request.body.merchant_id)).all();
            this.ctx.body = {
                status: true,
                messages: {
                    orders: orders
                }
            }
        }
        catch (e) {
            this.ctx.body = {
                status: false,
                messages: {}
            }

        }

    }

    /**
     * 根据商户ID查询所有外卖订单
     * @returns {Promise<void>}
     */
    public async listTakeoutOrder() {
        try {
            const orders = await (await this.service.order.listTakeoutOrder(this.ctx.request.body.merchant_id)).all();
            this.ctx.body = {
                status: true,
                messages: {
                    orders: orders
                }
            }
        }
        catch (e) {
            this.ctx.body = {
                status: false,
                messages: {}
            }

        }

    }

    /**
     * 根据商户ID查询所有预订订单
     * @returns {Promise<void>}
     */
    public async listReservedOrder() {
        try {
            const orders = await (await this.service.order.listReservedOrder(this.ctx.request.body.merchant_id)).all();
            this.ctx.body = {
                status: true,
                messages: {
                    orders: orders
                }
            }
        }
        catch (e) {
            this.ctx.body = {
                status: false,
                messages: {}
            }

        }

    }


    /**
     * 根据商户ID查询所有订单
     * @returns {Promise<void>}
     */
    public async listOrder() {
        try {
            const orders = await (await this.service.order.listOrderByMerchant(this.ctx.request.body.merchant_id)).all();
            this.ctx.body = {
                status: true,
                messages: {
                    orders: orders
                }
            }
        }
        catch (e) {
            this.ctx.body = {
                status: false,
                messages: {}
            };

        }

    }

    public async addOrder() {
        const params = this.ctx.request.body;
        const result = await this.service.order.addOrder(params.user_id, params.merchant_id, params.order);
        this.ctx.body = {
            status: result,
        };
    }
}
