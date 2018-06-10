import {Context} from 'egg';
import {app} from 'egg-mock/bootstrap';

describe('merchandiseTest', () => {
    let ctx: Context;
    before(async () => {
        ctx = app.mockContext();
    });

    it('deleteMerchandise', async () => {
        // const u = await ctx.service.merchandise.deleteMerchandise('228175');
        // console.log(u);
    });
});
