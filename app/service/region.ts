import BaseService from './base';

export default class RegionService extends BaseService {

    public async getRegions() {
        const provinces = await (await this.findByProperty('parent_id', '')).all();

        let p;
        for (const province of provinces) {
            const cities = await (await this.findByProperty('parent_id', province._key)).all();
            for (const city of cities) {
                const areas = await (await this.findByProperty('parent_id', city._key)).all();
                const _areas: Array<object> = [];
                for (const area of areas) {
                    _areas.push({area: area.name});
                }
            }
        }
        let regions = {address: provinces};
        return ;
    }
}
