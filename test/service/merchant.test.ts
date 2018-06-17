import {Context} from 'egg';
import {app} from 'egg-mock/bootstrap';

describe('merchantTest', () => {
    let ctx: Context;
    before(async () => {
        ctx = app.mockContext();
    });



    it('findMerchantAndSeatTypeById', async () => {
        const result = await ctx.service.merchant.findMerchantAndSeatTypeById('561456');
        // console.log(await result);
    });


});
