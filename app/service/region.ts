import BaseService from './base';

export default class RegionService extends BaseService {

    public async getAddress() {
        const provinces = await (await this.findByProperty('parent_id', '')).all();

        let p;
        for (const province of provinces) {
            const cities = await (await this.findByProperty('parent_id', province._key)).all();
            for (const city of cities) {
                const areas = await (await this.findByProperty('parent_id', city._key)).all();
                const ass: Array<object> = [];
                for (const area of areas) {
                    ass.push({areas: area.name});
                }
            }
        }
        let regions = {address: provinces};
        return ;
    }
}
