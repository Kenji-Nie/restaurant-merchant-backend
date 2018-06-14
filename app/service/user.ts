import BaseService from './base';
import User = model.schema.User;
import {aql} from 'arangojs';

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
     * 通过eamil查询用户
     * @param {string} email 邮箱地地
     * @returns {Promise<ArrayCursor>}
     */
    public async findUserByEmail(email: string) {
        return await this.findByProperty('email', email);
    }

    /**
     * 通过phone和email查询用户
     * @param {string} phone
     * @param {string} email
     * @returns {Promise<any | undefined>}
     */
    public async findUserByPhoneAndEamil(phone: string, email: string) {
        const query = `for u in user filter u.phone==${phone} and u.email==${email}`;
        const user = await (await this.query(query)).next();
        return user;
    }

    /**
     * 通过phone获取验证码
     * @param {string} phone
     * @returns {Promise<any>}
     */
    public async getYanZhengMa(phone: string) {
        let yanZhengMa ;
        yanZhengMa = 1234;
        return yanZhengMa;
    }

    /**
     * 通过phone、密码和验证码来获取用户的admin_id
     * @param {string} phone
     * @param {string} password
     * @param {number} YanZhengMa
     * @returns {Promise<any>}
     */

}
