import BaseService from './base';
import Admin = model.schema.Admin;

export default class AdminService extends BaseService {
    public async getAdminDetail(aid: string) {
        try {
            return await this.model.admin[aid];
        } catch (e) {
            return {_key: ''};
        }
    }
    public async getAdminId(phone: string, password: string, yanZhengMa: number) {
        const query = `for u in user filter u.phone==${phone} and u.password==${password}`;
        if ( yanZhengMa != null ) {
            const user = await (await this.query(query)).all();
            return user;
        }
    }
}
