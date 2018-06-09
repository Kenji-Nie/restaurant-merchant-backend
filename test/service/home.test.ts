import {app} from 'egg-mock/bootstrap';

describe('home',  () => {
    it('have', async () => {
        const ctx = app.mockContext();
        const u = await ctx.service.home.index();
        // console.log(u);
    });

});
