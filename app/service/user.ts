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
     * 通过id查找用户及角色
     * @param {string} uid
     * @returns {Promise<ArrayCursor>}
     */
    public async findUserAndRoleById(uid: string) {
        const query = aql`for u in user 
                            let rs = (
                                for r in role 
                                    filter r._key in u.role_ids 
                                return r
                            ) 
                            filter u._key == ${uid} 
                          return merge(u, {roles: rs})
                          `;
        return await this.query(query);
    }

    /**
     * 通过id查找用户及角色、订单
     * @param {string} uid
     * @param {string[]} children
     * @returns {Promise<ArrayCursor>}
     */
    public async findUserAndRoleAndOrderById(uid: string, children: string[]) {
        return await this.findInnnerJoinById(uid, children);
    }

    /**
     * 通过启用户名邮箱查找用户及角色、订单
     * @param {string} username
     * @param {string} email
     * @param {boolean} deletionFlag
     * @param {string[]} children
     * @returns {Promise<ArrayCursor>}
     */
    public async findUserAndRoleAndOrderByUsernameAndEmail(
        username: string, email: string, deletionFlag: boolean, children: string[]) {
        return await this.findInnnerJoinByProperies(
            ['username', 'email', 'deletion_flag'], [username, email, deletionFlag], children);
    }
}
