import BaseService from "./base";
import User = model.schema.User;

export default class HomeService extends BaseService {
    public async index() {
        return await this.model.user[17587];
    }
}