import {Context} from 'egg';
import {app} from 'egg-mock/bootstrap';

describe('adminTest', async() => {
    let ctx: Context;
    before(async() => {
        ctx = app.mockContext();
    });
    it('getAdminDetail', async() => {
        const admin = await ctx.service.admin.getAdminDetail('12564');
        console.log(admin);
    });
});
