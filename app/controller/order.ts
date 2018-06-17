import BaseController from './base';

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
        this.ctx.body = {
            status: await this.service.order.updateOrderStatus(this.ctx.request.body.order_ids, this.ctx.request.body.order_status)
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
}
