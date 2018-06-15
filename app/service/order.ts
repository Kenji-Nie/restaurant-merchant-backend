import BaseService from './base';

export default class OrderService extends BaseService {
    public async getOrdersByUserId(uid: string) {
        const user = await (await this.service.user.findUserAndOrderById(uid)).next();
        return user.orders;
    }



}
