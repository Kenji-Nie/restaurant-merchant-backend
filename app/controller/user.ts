import BaseController from "./base";

export default class UserController extends BaseController {

    public async getUserByUsername(username : string) {
        return this.service.user.findUserByUsername(username);
    }
}