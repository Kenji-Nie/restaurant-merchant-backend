import {app} from 'egg-mock/bootstrap';

describe('home',  () => {

    let ctx;
    before(async () => {
        ctx = app.mockContext();
    });


    it('getRegions', async () => {
        await ctx.service.region.getRegions();
    });

});
