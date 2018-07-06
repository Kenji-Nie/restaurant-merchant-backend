import BaseService from './base';
import Order = model.schema.Order;
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
        const query = `for o in order filter o._key in [${ids}] update o with {status: ${status}} in order`;
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
        // const query = `for o in order filter o.delete_flag==false && o._key in ${order_ids} && o.type==${orderType}
        // for u in user filter o._key in u.order_ids let phone = u.phone let username = u.username
        // let merchandises=(for m in merchandise filter m._key in o.merchandise_ids return m)
        // let coupons=(for c in coupon filter c._key in o.coupon_ids return c)
        // let sequence_numbers=(for s in seat filter o.seat_fid == s._key return s.sequence_number)
        // let sequence_number = LENGTH(sequence_numbers) > 0 ? sequence_numbers[0] : ""
        // return merge(o,{phone},{username},{sequence_number},{merchandises},{coupons})`;

        const query = aql`for o in order filter o.delete_flag==false && o._key in ${order_ids} && o.type==${orderType}  
        for u in user filter o._key in u.order_ids let phone = u.phone let username = u.username   
        let coupons=(for c in coupon filter c._key in o.coupon_ids return c) 
        return merge(o,{phone},{username},{coupons})`;
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
        let coupons=(for c in coupon filter c._key in o.coupon_ids return c) 
        return merge(o,{phone},{username},{sequence_number},{coupons})`;
        return await this.query(query);
    }


    public async addOrder(uid: string, mid: string, order: Order) {
        try {
            const user = await this.service.user.findUserByWxId(uid);
            const userOrder = user.order_ids || [];
            const merchantOrder = (await this.model.merchant[mid]).order_ids || [];
            const orderId = (await this.model.order.save(order))._key;
            userOrder.push(orderId);
            merchantOrder.push(orderId);
            await this.model.user.update(user._key, {order_ids: userOrder});
            await this.model.merchant.update(mid, {order_ids: merchantOrder});
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }


    /**
     * 根据用户ID和订单ID删除对应的订单
     * @param {string} uid
     * @param {string} oid
     * @returns {Promise<any>}
     */
    public async deleteOrder(uid: string, mid: string, oid: string) {
        // const query = aql`for u in user filter u._key==${uid} let ord_ids = REMOVE_VALUE(u.order_ids,${oid}) update u with {order_ids:ord_ids} in user remove ${oid} in order`;
        const query = aql`for u in user filter u._key==${uid} let user_ord_ids = REMOVE_VALUE(u.order_ids,${oid}) 
        update u with {order_ids:user_ord_ids} in user for m in merchant filter m._key == ${mid} 
        let merchant_ord_ids = REMOVE_VALUE(m.order_ids,${oid}) 
        update m with {order_ids:merchant_ord_ids} in merchant remove ${oid} in order`;
        return await this.query(query);
    }


}
