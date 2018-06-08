import {Context } from 'egg';
import BaseService from "./base";
import {aql} from "arangojs";
import User = model.schema.User;

export default class UserService extends BaseService {

    public async getUser(uid : number) {
        return await this.model.user[uid];
    }

    public async findUserByUsername(username : string) {
        const query = aql`for u in user filter u.username == ${username} return u`;
        const cursor = await this.db.query(query);
        await this.query();
        return await cursor.next();

    }
}