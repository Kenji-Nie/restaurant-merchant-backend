import {app} from 'egg-mock/bootstrap';

describe('getUserByUsername()', () => {
    let ctx;
    before(async () => {
        ctx = app.mockContext();
    });

    it('findUserByUsername', async () => {
        const u = await ctx.service.user.findUserByUsername('zhangsan');
        // console.log('user');
        // console.log(u);
    });

    it('findUserByUsernameAndEmail', async () => {
        const u = await ctx.service.user.findUserByUsernameAndEmail('lisi', 'zhangsan', true);

        // console.log('user');
        // console.log(u);
    });

    it('save', async () => {
        let user  = {
            username: "mazi",
            password: "mazi",
            name: "mazi",
            wx_uid: "wanger",
            phone: "wanger",
            email: "wanger",
            registration_date: "zhangsan",
            role_ids: [],
            order_ids: [],
            coupon_ids: [],
            addresses: "",
            id_card: "",
            merchants: [],
            deletion_flag: true
        }
        // const u = await ctx.service.user.save(user);

    });

    it('findUserAndRoleById', async () => {
        const result = await (await ctx.service.user.findUserAndRoleById('109081')).next();
        // console.log(result);
    });

    it('findUserAndRoleAndOrderById', async () => {
        const user = await (await ctx.service.user.findUserAndRoleAndOrderById('109081',['role','order'])).next();
        console.log(user.roles);
        console.log(user.orders);
    });
});
