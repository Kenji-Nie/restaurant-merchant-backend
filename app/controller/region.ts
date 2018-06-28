import BaseController from './base';

export default class RegionController extends BaseController {

    public async listRegions() {
        const regions = await this.service.region.listRegions();
        this.ctx.body = {
            message: regions,
            status: true,
        };
    }
}
