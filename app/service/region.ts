import BaseService from './base';

export default class RegionService extends BaseService {

    public async getRegions() {
        let provinces = await (await this.findByProperty('parent_id', 1)).all();

        for (let provience of provinces) {
            let cities = await (await this.findByProperty('parent_id', new Number(provience._key))).all();
            provience.cities = cities;
            for (let city of cities) {
                let areas = await (await this.findByProperty('parent_id', new Number(city._key))).all();
                city.areas = areas;
            }
        }
        return provinces;
    }
}
