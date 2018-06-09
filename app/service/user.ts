import BaseService from './base';
import User = model.schema.User;
import {aql} from 'arangojs';

export default class UserService extends BaseService {

    public async getUser(uid: number) {
        return await this.model.user[uid];
    }

    public async findUserByUsername(username: string) {
        const cursor = await this.findByProperty('username', username);
        return await cursor.next();

    }

    public async findUserByUsernameAndEmail(username: string, email: string, deletionFlag: boolean) {
        const cursor = await this.findByProperies(
            ['username', 'email', 'deletion_flag'], [username, email, deletionFlag]);
        return await cursor.next();
    }

    public async save(user: User) {
        return await this.model.user.save(user);
    }

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

    public async findUserAndRoleAndOrderById(uid: string, children: string[]) {
        return await this.findInnnerJoinById(uid, children);
    }

    public async findUserAndRoleAndOrderByUsernameAndEmail(
        username: string, email: string, deletionFlag: boolean, children: string[]) {
        return await this.findInnnerJoinByProperies(
            ['username', 'email', 'deletion_flag'], [username, email, deletionFlag], children);
    }
}
