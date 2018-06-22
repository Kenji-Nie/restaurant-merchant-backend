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

    it('add', async () => {
        const u = await ctx.service.merchandise.add('461123', {
            dsdsde:'ssdsdsdsdsdsd',
            dvvrf:23232323,
            fgtg:'dfdfdfdfdf',
        })
        console.log(u);
    });
});
