import BaseService from './base';
import User = model.schema.User;
import Merchant = model.schema.Merchant;
import {aql} from 'arangojs/lib/async/aql-query';
import {consoleTestResultHandler} from 'tslint/lib/test';
import Coupon = model.schema.Coupon;

export default class UserService extends BaseService {

    /**
     * 通过用户id查找用户详细信息
     * @param {number} uid
     * @returns {Promise<void>}
     */
    public async findUserById(uid: string) {
        return await this.model.user[uid];
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
            return await this.model.user.update(uid, {merchant_ids: merchantId});
        }else {
            merchantId = [];
            merchantId.push(newMerchant._key);
            return await this.model.user.update(uid, {merchant_ids: merchantId});
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
        }else {
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
        const user = await this.model.user[uid];
        const merchants = user.merchant_ids;
        let allMerchantMessage;
        allMerchantMessage = [];
        if (merchants !== undefined && merchants.length !== 0) {
            for (let m = 0; m < merchants.length; m++) {
                const merchant = await this.model.merchant[merchants[m]];
                allMerchantMessage.push(merchant);
            }
            return allMerchantMessage;
        }else {
            return null;
        }
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
        }catch (e) {
            return false;
        }
    }
    /**
     * 向user_id的用户添加coupon_id的优惠券
     * @param {string} uid
     * @param {string} cid
     * @returns {Promise<any>}
     */
    public async addUserCoupon(uid: string, cid: string) {
        const user = await this.model.user[uid];
        let couponId;
        couponId = user.coupon_ids;
        if (couponId !== undefined) {
           couponId.push(cid);
           return await this.model.user.update(uid, {coupon_ids: couponId});
        }else {
            couponId = [];
            couponId.push(cid);
            return await this.model.user.update(uid, {coupon_ids: couponId});
        }
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
            return allCouponMessage;
        }else {
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
        }else {
            return null;
        }
    }

}
