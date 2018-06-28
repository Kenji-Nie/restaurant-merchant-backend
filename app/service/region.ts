import BaseService from './base';

export default class RegionService extends BaseService {

    public async listRegions() {
        const provinces = await (await this.findByProperty('parent_id', '1')).all();

        for (const provience of provinces) {
            const cities = await (await this.findByProperty('parent_id', provience._key)).all();
            provience.children = cities;
            for (const city of cities) {
                const areas = await (await this.findByProperty('parent_id', city._key)).all();
                city.children = areas;
            }
        }
        return provinces;
    }
}
