import {Context} from 'egg';
import {app} from 'egg-mock/bootstrap';

describe('userTest', () => {
    let ctx: Context;
    before(async () => {
        ctx = app.mockContext();
    });

    it('updateOrderStatus', async () => {
        const result = await ctx.service.order.updateOrderStatus(['452418','452298'], 0);
    });

    it('listEatinOrder', async () => {
        const result = await ctx.service.order.listEatinOrder("461123");
        console.log(await result.all());
    });

});
