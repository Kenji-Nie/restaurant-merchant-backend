import BaseController from './base';

export default class OrderController extends BaseController {

    public async getPurchaseRecord() {
        const params = this.ctx.params;
        this.ctx.body = {
            message: await this.service.order.getOrdersByUserId(params.user_id),
            status: true,
        };
    }
    // "nick_name": "贝贝",
    // "people_number": 5,
    // "coupon_name": "满100减30元",
    // "order_status_fid": "堂食订单",

}
