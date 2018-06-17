import {Context} from 'egg';
import {app} from 'egg-mock/bootstrap';

describe('seatTypeTest', () => {
    let ctx: Context;
    before(async () => {
        ctx = app.mockContext();
    });

    it('updateSeatType', async () => {
        const r = await ctx.service.seatType.updateSeatType('587057',{name:'雅座'});
        // console.log(r);
    });


    it('deleteSeatTypes', async () => {
        const r = await ctx.service.seatType.deleteSeatTypes(['1','2']);
        console.log(r);
    });

});
