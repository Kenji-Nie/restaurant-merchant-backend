import {Context} from 'egg';
import {app} from 'egg-mock/bootstrap';

describe('seatTest', () => {
    let ctx: Context;
    before(async () => {
        ctx = app.mockContext();
    });

    it('deleteSeats', async () => {
        // const r = await ctx.service.seat.deleteSeats(['1','2']);
        // console.log(r);
    });

    it('updateSeatStatus', async () => {
        const r = await ctx.service.seat.updateSeatStatus(['464560','464443'],0);
    });



});
