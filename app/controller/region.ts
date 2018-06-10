import BaseController from './base';

export default class RegionController extends BaseController {

    public async getRegions() {
        const regions = await this.service.region.getRegions();
        this.ctx.body = {
            message: regions,
            status: true,
        };
    }
}
