import BaseService from './base';
import {aql} from 'arangojs/lib/async/aql-query';
import User = model.schema.User;
import Merchant = model.schema.Merchant;
import Address = model.schema.Address;
import Order = model.schema.Order;

export default class UserService extends BaseService {

    /**
     * 通过用户id查找用户详细信息
     * @param {number} uid
     * @returns {Promise<void>}
     */
    public async findUserById(uid: string) {
        return await this.model.user[uid];
    }

    public async findUserByWxId(uid: string) {
        return await (await this.findByProperty('wx_uid', uid)).next();
    }

    /**
     * 通过电话号码及密码查询用户
     * @param {string} phone
     * @param {string} password
     * @returns {Promise<any>}
     */
    public async findUserByPhoneAndPassword(phone: string, password: string) {
        const query = aql`for u in user filter u.phone==${phone} and u.password==${password} return u`;
        return await (await this.query(query)).all();
    }

    /**
     * 通过用户名查找用户
     * @param {string} username
     * @returns {Promise<any | undefined>}
     */
    public async findUserByUsername(username: string) {
        const cursor = await this.findByProperty('username', username);
        return await cursor.next();
    }

    /**
     * 通过用户名及邮箱查找用户
     * @param {string} username
     * @param {string} email
     * @param {boolean} deletionFlag
     * @returns {Promise<any | undefined>}
     */
    public async findUserByUsernameAndEmail(username: string, email: string, deletionFlag: boolean) {
        const cursor = await this.findByProperies(
            ['username', 'email', 'deletion_flag'], [username, email, deletionFlag]);
        return await cursor.next();
    }

    /**
     * 保存用户
     * @param {model.schema.User} user
     * @returns {Promise<any>}
     */
    public async save(user: User) {
        return await this.model.user.save(user);
    }

    /**
     * 通过id查找用户及订单
     * @param {string} uid
     * @param {string[]} children
     * @returns {Promise<ArrayCursor>}
     */
    public async findUserAndOrderById(uid: string) {
        return await this.findInnnerJoinById(uid, ['order']);
    }

    /**
     * 通过email查询用户
     * @param {string} email 邮箱地地
     * @returns {Promise<ArrayCursor>}
     */
    public async findUserByEmail(email: string) {
        return await this.findByProperty('email', email);
    }

    /**
     * 通过phone获取验证码
     * @param {string} phone
     * @returns {Promise<any>}
     */
    public async getYanZhengMa(phone: string) {
        if (phone) {
            const yanZhengMa = 1234;
            return yanZhengMa;
        }
    }

    /**
     * 通过phone、密码和验证码来获取用户的id
     * @param {string} phone
     * @param {string} password
     * @param {number} YanZhengMa
     * @returns {Promise<any>}
     */
    public async forgetPassword(phone: string, password: string, YanZhengMa: number) {
        const query = aql`for u in user filter u.phone==${phone} and u.password==${password} return u`;
        if (YanZhengMa) {
            return await (await this.query(query)).all();
        }
    }

    /**
     * 根据用户的id以及相关数据更新针对该用户的数据
     * @param {string} aid
     * @param {model.schema.User} userMessage
     * @returns {Promise<any>}
     */
    public async updateUserDetail(uid: string, userMessage: User) {
        return await this.model.user.update(uid, userMessage);
    }

    /**
     * 根据该用户的id创建针对该用用户的商铺
     * @param {string} aid
     * @param {model.schema.Merchant} merchantMessage
     * @returns {Promise<void>}
     */
    public async createMerchant(uid: string, merchantMessage: Merchant) {
        const newMerchant = await this.model.merchant.save(merchantMessage);
        const user = await this.model.user[uid];
        let merchantId;
        merchantId = user.merchant_ids;
        if (merchantId !== undefined) {
            merchantId.push(newMerchant._key);
            await this.model.user.update(uid, {merchant_ids: merchantId});
            return newMerchant._key;
        } else {
            merchantId = [];
            merchantId.push(newMerchant._key);
            await this.model.user.update(uid, {merchant_ids: merchantId});
            return newMerchant._key;
        }
    }

    /**
     * 更改user_ID的用户的密码
     * @param {string} uid
     * @param {string} userOldPassword
     * @param {string} userNewPassword
     * @returns {Promise<any>}
     */
    public async updatePassword(uid: string, userOldPassword: string, userNewPassword: string) {
        const user = await this.model.user[uid];
        const password = user.password;
        if (password === userOldPassword) {
            return await this.model.user.update(uid, {password: userNewPassword});
        } else {
            return 0;
        }
    }

    /**
     * 通过phone、密码和验证码注册用户信息并返回注册后的用户id
     * @param {string} phone
     * @param {string} password
     * @param {number} YanZhengMa
     * @returns {Promise<any>}
     */
    public async userRegister(YanZhengMa: number, userMessage: User) {
        if (YanZhengMa) {
            return await this.model.user.save(userMessage);
        }
    }

    /**
     * 根据用户ID获取该用户的商铺信息
     * @param {string} uid
     * @returns {Promise<void>}
     */
    public async listMerchant(uid: string) {
        // const user = await this.model.user[uid];
        // const merchants = user.merchant_ids;
        // let allMerchantMessage;
        // allMerchantMessage = [];
        // if (merchants !== undefined && merchants.length !== 0) {
        //     for (let m = 0; m < merchants.length; m++) {
        //         const merchant = await this.model.merchant[merchants[m]];
        //         allMerchantMessage.push(merchant);
        //     }
        //     return allMerchantMessage;
        // }else {
        //     return null;
        // }

        return await (await this.findInnnerJoinById(uid, ['merchant'])).next();
    }

    /**
     * 根据该用户的id集修改该用户的备注
     * @param {string[]} uids
     * @param {string} remarkMessage
     * @returns {Promise<boolean>}
     */
    public async modifyRemark(uids: string[], remarkMessage: string) {
        /*for ( let u = 0; u < uids.length; u++) {
            await this.model.user.update(uids[u], {remark: remarkMessage});
        }
        return true;*/
        const query = aql`for u in user filter u._key in ${uids}
                       update u with { remark: ${remarkMessage} } in user`;
        try {
            await this.query(query);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * 向user_id的用户添加coupon_id的优惠券
     * @param {string} uid
     * @param {string} cid
     * @returns {Promise<any>}
     */
    public async addUserCoupon(uids: string[], cids: string[]) {
        let usernames;
        usernames = [];
        for (let u = 0; u < uids.length; u++) {
            const user = await this.model.user[uids[u]];
            usernames.push(user.username);
            let coupons;
            coupons = user.coupon_ids;
            if (coupons !== undefined && coupons.length !== 0) {
                for (let c = 0; c < cids.length; c++) {
                    coupons.push(cids[c]);
                }
            } else {
                coupons = [];
                for (let c = 0; c < cids.length; c++) {
                    coupons.push(cids[c]);
                }
            }
            await this.model.user.update(uids[u], {coupon_ids: coupons});
        }
        return usernames;
    }

    /**
     * 根据用户的id获得该用户的优惠券记录
     * @param {string} uid
     * @returns {Promise<void>}
     */
    public async getUserCoupon(uid: string) {
        const user = await this.model.user[uid];
        const coupons = user.coupon_ids;
        let allCouponMessage;
        allCouponMessage = [];
        if (coupons !== undefined && coupons.length !== 0) {
            for (let c = 0; c < coupons.length; c++) {
                const coupon = await this.model.coupon[coupons[c]];
                allCouponMessage.push(coupon);
            }
            return {username: user.username, coupons: allCouponMessage};
        } else {
            return null;
        }
    }

    /**
     * 根据用户id获取用户的订单记录
     * @param {string} uid
     * @returns {Promise<any>}
     */
    public async getOrder(uid: string) {
        const user = await this.model.user[uid];
        const orders = user.order_ids;
        let allOrderMessage;
        allOrderMessage = [];
        if (orders !== undefined && orders.length !== 0) {
            for (let o = 0; o < orders.length; o++) {
                const order = await this.model.order[orders[o]];
                allOrderMessage.push(order);
            }
            return allOrderMessage;
        } else {
            return null;
        }
    }
    /**
     * 获取用户集合为myOrder,address,myCoupon使用数据
     * @param {string} wid
     * @returns {Promise<ArrayCursor>}
     *
     * 此方法已经由 Hale D. Lee 修改
     *
     */
    public async getUser(wid: string) {
        const user = await (await this.findByProperty('wx_uid', wid)).next();
        let roleIds = user.role_ids || [];
        let couponIds = user.coupon_ids || [];
        let addressIds = user.address_ids || [];
        let orderIds = user.order_ids || [];
        // 华丽的分割线
        roleIds = roleIds.map((item) =>
            this.model.role[item],
        );
        couponIds = couponIds.map((item) =>
            this.model.coupon[item],
        );
        addressIds = addressIds.map((item) =>
            this.model.address[item],
        );
        orderIds = orderIds.map(async (item) => {
            const order = await this.model.order[item];
            let oCouponIds: any[] = order.coupon_ids || [];
            let merchandiseIds: any[] = order.merchandise_ids || [];
            // 华丽的分割线
            oCouponIds = oCouponIds.map((o) =>
                this.model.coupon[o],
            );
            merchandiseIds = merchandiseIds.map((o) =>
                this.model.merchandise[o],
            );
            // 华丽的分割线
            return Object.assign({}, order, {
                coupons: await Promise.all(oCouponIds),
                merchandises: await Promise.all(merchandiseIds),
            });
        });
        // 华丽的分割线
        return Object.assign({}, user, {
            roles: await Promise.all(roleIds),
            coupons: await Promise.all(couponIds),
            addresses: await Promise.all(addressIds),
            orders: await Promise.all(orderIds),
        });
    }

    /**
     * 注册页面注册电话号码
     * @param {string} phoneNumber
     * @param {string} uid
     * @param {number} YanZhengMa
     * @returns {Promise<any>}
     */
    public async addPhone(phoneNumber: string, uid: string, YanZhengMa: string) {
        if (YanZhengMa) {
            return await this.model.user.update(uid, {phone: phoneNumber});
        }
    }

    /**
     * 添加地址页面
     * @param {string} uid
     * @param {model.schema.Address} addressMessage
     * @returns {Promise<any>}
     */
    public async addAddress(uid: string, addressMessage: Address) {
        const address = await this.model.address.save(addressMessage);
        const user = await this.model.user[uid];
        let addressIds;
        addressIds = user.address_ids;
        if (addressIds !== undefined && addressIds.length !== 0) {
            addressIds.push(address._key);
        }else {
            addressIds = [];
            addressIds.push(address._key);
        }
        await this.model.user.update(uid, {address_ids: addressIds});
        return address._key;
    }

    /**
     * 更新地址界面根据用户ID更新对应的地址
     * @param {string} uid
     * @param {string} aid
     * @param {model.schema.Address} addressMessage
     * @returns {Promise<any>}
     */
    public async updateAddress(uid: string, aid: string, addressMessage: Address) {
        return await this.model.address.update(aid, addressMessage);
    }

    /**
     * 删除地址---根据用户的ID和地址ID删除对应的地址
     * @param {string} aid
     * @returns {Promise<any>}
     */
    public async deleteAddress(uid: string, aid: string) {
        const query = aql`for u in user filter u._key==${uid} let add_ids = REMOVE_VALUE(u.address_ids,${aid}) update u with {address_ids:add_ids} in user remove ${aid} in address`;
        return await this.query(query);
    }

    /**
     * 更具用户ID和订单ID删除对应的订单
     * @param {string} uid
     * @param {string} oid
     * @returns {Promise<any>}
     */
    public async deleteOrder(uid: string, oid: string) {
        const query = aql`for u in user filter u._key==${uid} let ord_ids = REMOVE_VALUE(u.order_ids,${oid}) update u with {order_ids:ord_ids} in user remove ${oid} in order`;
        return await this.query(query);
    }

    /**
     * 新建订单
     * @param {string} uid
     * @param {string} mid
     * @param {model.schema.Order} orderMessage
     * @returns {Promise<any>}
     */
    public async addOrder(uid: string, mid: string, orderMessage: Order) {
        const newOrder = await this.model.order.save(orderMessage);
        const user = await this.model.user[uid];
        const merchant = await this.model.merchant[mid];
        let userOrderIds;
        userOrderIds = user.order_ids;
        let merchantOrderIds;
        merchantOrderIds = merchant.order_ids;
        if (userOrderIds === undefined) {
            userOrderIds = [];
        }
        userOrderIds.push(newOrder._key);
        if (merchantOrderIds === undefined) {
            merchantOrderIds = [];
        }
        merchantOrderIds.push(newOrder._key);
        await this.model.user.update(uid, {order_ids: userOrderIds});
        await this.model.merchant.update(mid, {order_ids: merchantOrderIds});
        return newOrder._key;
    }

    /**
     * 为用户新增优惠券
     * @param {string} uid
     * @param {string} cid
     * @returns {Promise<any>}
     */
    public async addCoupon(uid: string, cid: string) {
        const user = await this.model.user[uid];
        let couponIds;
        couponIds = user.coupon_ids;
        if (couponIds === undefined) {
            couponIds = [];
        }
        couponIds.push(cid);
        return await this.model.user.update(uid, {coupon_ids: couponIds});
    }
}
