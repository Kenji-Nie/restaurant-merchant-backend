import {app} from 'egg-mock/bootstrap';

describe('getUserByUsername()', () => {
    it('have', async () => {
        const ctx = app.mockContext();
        const u = await ctx.service.user.findUserByUsername('zhangsan');
        // console.log('user');
        console.log(u);
    });

});