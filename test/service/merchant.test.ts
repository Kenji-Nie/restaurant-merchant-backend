import {Context} from 'egg';
import {app} from 'egg-mock/bootstrap';

describe('merchantTest', async () => {
    let ctx: Context;
    before(async () => {
        ctx = app.mockContext();
    });
    it('getMerchants', async () => {
        const merchants = await ctx.service.merchant.getMerchants('121223');
        console.log(merchants);
    });
});
