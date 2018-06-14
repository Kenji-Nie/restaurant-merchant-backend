import {Context} from 'egg';
import {app} from 'egg-mock/bootstrap';

describe('userTest', () => {
    let ctx: Context;
    before(async () => {
        ctx = app.mockContext();
    });

    it('findUserByPhoneAndPassword', async () => {
        const u = await ctx.service.user.findUserByPhoneAndPassword('13212341234', '123456');
        // console.log(u);
    });

    // it('findUserByUsername', async () => {
    //     const u = await ctx.service.user.findUserByUsername('zhangsan');
    //     // console.log('user');
    //     // console.log(u);
    // });
    //
    // it('findUserByUsernameAndEmail', async () => {
    //     const u = await ctx.service.user.findUserByUsernameAndEmail('lisi', 'zhangsan', true);
    //     // console.log('user');
    //     // console.log(u);
    // });
    //
    // it('save', async () => {
    //     const user  = {
    //         username: 'mazi',
    //         password: 'mazi',
    //         name: 'mazi',
    //         wx_uid: 'wanger',
    //         phone: 'wanger',
    //         email: 'wanger',
    //         registration_date: 'zhangsan',
    //         role_ids: [],
    //         order_ids: [],
    //         coupon_ids: [],
    //         addresses: '',
    //         id_card: '',
    //         merchants: [],
    //         deletion_flag: true,
    //     };
    //     // const u = await ctx.service.user.save(user);
    // });

    it('findUserByEmail', async () => {
        const corsor = await ctx.service.user.findUserByEmail('wanger');
        // console.log(await corsor.next());
        // console.log(u);
    });
    it('findUserByPhoneAndEamil', async () => {
        const user = await ctx.service.user.findUserByPhoneAndEamil('13212341234', 'zhangsan');
        console.log(user);
    });
    it('getAdminId', async() => {
        const adminId = await ctx.service.user.getAdminId('13212341234', '123', 1234);
        console.log(adminId);
    });
});
