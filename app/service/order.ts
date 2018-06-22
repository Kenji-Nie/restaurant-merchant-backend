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
    public async updateOrderStatus(ids: string[], status: number) {
        console.log(ids);
        const query = `for o in order filter o._key in [${ids}] update o with {status: ${status}} in order`;
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
        return await this.listOrderByMerchantAndType(merchant_id, 0);
    }

    /**
     * 根据商户ID查询所有外卖订单
     * @param {string} merchant_id
     * @returns {Promise<ArrayCursor>}
     */
    public async listTakeoutOrder(merchant_id: string) {
        return await this.listOrderByMerchantAndType(merchant_id, 1);
    }

    /**
     * 根据商户ID查询所有预约订单
     * @param {string} merchant_id
     * @returns {Promise<ArrayCursor>}
     */
    public async listReservedOrder(merchant_id: string) {
        return await this.listOrderByMerchantAndType(merchant_id, 2);
    }


    /**
     * 通过商户及订单类型列出所有订单
     * @param {string} merchant_id
     * @param {string} orderType
     * @returns {Promise<ArrayCursor>}
     */
    public async listOrderByMerchantAndType(merchant_id: string, orderType: number) {
        const merchant = await this.model.merchant[merchant_id];
        const order_ids = merchant.order_ids;
        const query = aql`for o in order filter o.delete_flag==false && o._key in ${order_ids} && o.type==${orderType}  
        for u in user filter o._key in u.order_ids let phone = u.phone let username = u.username
        let merchandises=(for m in merchandise filter m._key in o.merchandise_ids return m)  
        let coupons=(for c in coupon filter c._key in o.coupon_ids return c) 
        let sequence_numbers=(for s in seat filter o.seat_fid == s._key return s.sequence_number) 
        let sequence_number = LENGTH(sequence_numbers) > 0 ? sequence_numbers[0] : ""
        return merge(o,{phone},{username},{sequence_number},{merchandises},{coupons})`;
        return await this.query(query);
    }


    /**
     * 通过商户列出所有订单
     * @param {string} merchant_id
     * @returns {Promise<ArrayCursor>}
     */
    public async listOrderByMerchant(merchant_id: string) {
        const merchant = await this.model.merchant[merchant_id];
        const order_ids = merchant.order_ids;
        const query = aql`for o in order filter o.delete_flag==false && o._key in ${order_ids}   
        for u in user filter o._key in u.order_ids let phone = u.phone let username = u.username
        let merchandises=(for m in merchandise filter m._key in o.merchandise_ids return m)  
        let coupons=(for c in coupon filter c._key in o.coupon_ids return c) 
        let sequence_numbers=(for s in seat filter o.seat_fid == s._key return s.sequence_number) 
        let sequence_number = LENGTH(sequence_numbers) > 0 ? sequence_numbers[0] : ""
        return merge(o,{phone},{username},{sequence_number},{merchandises},{coupons})`;
        return await this.query(query);
    }

}
