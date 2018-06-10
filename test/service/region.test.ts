import {Context} from 'egg';
import {app} from 'egg-mock/bootstrap';

describe('home',  () => {

    let ctx: Context;
    before(async () => {
        ctx = app.mockContext();
    });
    it('getRegions', async () => {
        const u = await ctx.service.region.getRegions();
        console.log(u);
    });

});
