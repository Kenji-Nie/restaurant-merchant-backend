import BaseController from './base';

export default class RegionController extends BaseController {

    public async getRegions() {
        let regions = await this.service.region.getRegions();
        let result = {'regions': regions, 'status': true};
        this.ctx.body = result;
    }
}