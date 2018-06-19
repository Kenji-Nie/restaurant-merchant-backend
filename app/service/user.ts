import BaseService from './base';
import User = model.schema.User;
import Merchant = model.schema.Merchant;
import {aql} from 'arangojs/lib/async/aql-query';

export default class UserService extends BaseService {

    /**
     * 通过uid查找用户
     * @param {number} uid
     * @returns {Promise<void>}
     */
    public async findUser(uid: number) {
        return await this.model.user[uid];
    }
    /**
     * 通过电话号码及密码查询用户
     * @param {string} phone
     * @param {string} password
     * @returns {Promise<any>}
     */
    public async findUserByPhoneAndPassword(phone: string, password: string) {
        const cursor = await this.findByProperies(['phone', 'password'], [phone, password]);
        if (cursor.hasNext()) {
            return cursor.next();
        } else {
            return null;
        }
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
            let yanZhengMa ;
            yanZhengMa = 1234;
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
        const query = `for u in user filter u.phone==${phone} and u.password==${password} return u`;
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
    public async updateUserDetail(aid: string, userMessage: User) {
        return await this.model.user.update(aid, userMessage);
    }

    /**
     * 根据该用户的id创建针对该用用户的商铺
     * @param {string} aid
     * @param {model.schema.Merchant} merchantMessage
     * @returns {Promise<void>}
     */
    public async createMerchant(uid: string, merchantMessage: Merchant) {
        return await this.model.user.update(uid, merchantMessage);
    }

    /**
     * 根据用户id修改用户的密码
     * @param {string} uid
     * @param {string} newPassword
     * @returns {Promise<boolean>}
     */
    public async updatePassword(uid: string, newPassword: string) {
        (await this.model.user[uid]).password = newPassword;
        return true;
    }

    /**
     * 通过phone、密码和验证码来获取用户的id
     * @param {string} phone
     * @param {string} password
     * @param {number} YanZhengMa
     * @returns {Promise<any>}
     */
    public async getUserId(phone: string, password: string, YanZhengMa: number) {
        const query = `for u in user filter u.phone==${phone} and u.password==${password} return u`;
        if (YanZhengMa) {
            return await (await this.query(query)).all();
        }
    }

    /**
     * 根据用户ID获取该用户的商铺信息
     * @param {string} uid
     * @returns {Promise<void>}
     */
    public async listMerchant(uid: string) {
        /*const user = await this.model.user[uid];
        return await user.merchant_ids;*/
        return await this.model.user[uid].merchant_ids;
        /*let merchantIds ;
        merchantIds = user.merchant_ids;
        return await this.model.merchant[merchantIds];*/
    }

    /**
     * 根据该用户的id集修改该用户的备注
     * @param {string[]} uids
     * @param {string} remark
     * @returns {Promise<boolean>}
     */
    public async modifyRemark(uids: string[], remark: string) {
        const query = aql`for u in user filter u._key in ${uids}
                       update u with { status: ${remark} } in user`;
        await this.query(query);
    }
    /**
     * 根据用户id添加对应的优惠券
     * @param {string[]} uids
     * @param {string[]} cids
     * @returns {Promise<boolean>}
     */
    public async addUserCoupon(uids: string[], cids: string[]) {
        for (let u = 0; u < uids.length; u++) {
            for (let c = 0; c < cids.length; c++) {
                await this.model.user.update(uids[u], await this.model.coupon[cids[c]]);
            }
        }
        return true;
    }

    /**
     * 根据用户的id获得该用户的优惠券记录
     * @param {string} uid
     * @returns {Promise<void>}
     */
    public async getUserCoupon(uid: string) {
        const user = await this.model.user[uid];
        return await user.coupon_ids;
    }
}
