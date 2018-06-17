import BaseService from './base';
import {aql} from "arangojs/lib/async/aql-query";

export default class OrderService extends BaseService {
    public async getOrdersByUserId(uid: string) {
        const user = await (await this.service.user.findUserAndOrderById(uid)).next();
        return user.orders;
    }


    /**
     * 根据订单编号批量修改订单状态
     * @param {string[]} ids
     * @param {number} order_status
     * @returns {Promise<void>}
     */
    public async updateOrderStatus(ids: string[], order_status: number) {
        const query = `for o in order filter o._key in ${ids} update o with {order_status: ${order_status}} in order`;
        console.log(query);
        try {
            await this.query(query);
            return true;
        }
        catch (e) {
            return false;
        }
    }

    /**
     * 根据商户ID查询所有堂食订单
     * @param {string} merchant_id
     * @returns {Promise<ArrayCursor>}
     */
    public async listEatinOrder(merchant_id: string) {
        const merchant = await this.model.merchant[merchant_id];
        const order_ids = merchant.order_ids;
        const query = aql`for o in order filter o._key in ${order_ids} && o.type==0  
        for s in seat filter o.seat_fid == s._key let sequence_number = s.sequence_number 
        for u in user filter o._key in u.order_ids let phone = u.phone 
        let merchandises=(for m in merchandise filter m._key in o.merchandise_ids return m)  
        let coupons=(for c in coupon filter c._key in o.coupon_ids return c)  
        return {order:merge(o,{phone},{sequence_number},{merchandises},{coupons})}`;
        return await this.query(query);
    }

}
