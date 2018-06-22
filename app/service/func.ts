import BaseService from './base';

export default class FuncService extends BaseService {

    public async getMenus() {
        const func1s = await (await this.findByProperty('parent_id', '1')).all();
        for (const func of func1s) {
            const func2s = await (await this.findByProperty('parent_id', func._key)).all();
            func.children = func2s;
        }
        return func1s;
    }
}
