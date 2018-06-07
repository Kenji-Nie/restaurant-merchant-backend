import BaseService from "./base";

export default class UserService extends BaseService {

    public async getUser(uid : number) {
        return await this.model.user[uid];
    }
}