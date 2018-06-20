import {Context} from 'egg';
import {app} from 'egg-mock/bootstrap';

describe('userTest', () => {
    let ctx: Context;
    before(async () => {
        ctx = app.mockContext();
    });

    it('findUserByPhoneAndPassword', async () => {
        const u = await ctx.service.user.findUserByPhoneAndPassword('13212341234', '123456');
        console.log(u);
    });

    it('findUserByUsername', async () => {
        const u = await ctx.service.user.findUserByUsername('mazi');
        // console.log('user');
        // console.log(u);
    });

    it('userLogin', async () => {
        const u = await ctx.service.user.findUserByUsernameAndEmail('mazi', 'wanger', true);
        // console.log('user');
        // console.log(u);
    });

    it('save', async () => {
        const user  = {
            type_fid: 'userType/001',
            sign_up_date: '',
            username: 'mazi',
            password: 'mazi',
            name: 'mazi',
            wx_uid: 'wanger',
            phone: 'wanger',
            email: 'wanger',
            registration_date: 'zhangsan',
            role_ids: [],
            order_ids: [],
            coupon_ids: [],
            addresses: '',
            id_card: '',
            merchants: [],
            deletion_flag: true,
        };
        const u = await ctx.service.user.save(user);
    });
    it('findUserByEmail', async () => {
        const corsor = await ctx.service.user.findUserByEmail('wanger');
        // console.log(await corsor.next());
        // console.log(u);
    });
    it('forgetPassword', async() => {
        const userId = await ctx.service.user.forgetPassword('123456789', '123', 1234);
        console.log(userId);
    });
    it('getYanZhengMa', async () => {
        const yanZhengMa = await ctx.service.user.getYanZhengMa('13212341234');
        console.log(yanZhengMa);
    });
    it('updateUserDetail', async () => {
        const message = {
            type_fid: 'userType/001',
            id: '001',
            nickName: '贝贝',
            wx_uid: '',
            sign_up_date: '',
            phone_number: '13212341234',
            email: '123456@qq.com',
            bindPhone: '+86-13212341234',
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3130941937,234504968&fm=27&gp=0.jpg',
            gender: 0,
        };
        const result = await ctx.service.user.updateUserDetail('326752', message );
        console.log(result);
    });
    it('createMerchant', async () => {
        const message = {
            type_fid: 'merchantType/001',
            id: '001',
            name: '',
            legal_person_name: '',
            legal_person_id_card: '',
            business_license_number: '',
            business_license_img: '',
            sign_up_date: '',
            open_time: '08:00',
            close_time: '22:00',
            takeaway_snoring_flag: '',
            takeaway_open_time: '',
            takeaway_close_time: '',
            min_takeaway_amount: '',
            max_takeaway_distance: '',
            merchant_name: '微笑宝贝1',
            merchant_type_fid: '餐饮',
            mainInformation: '未认证',
            storeStatus: '营业中',
            storeAvatar: 'http://img3.imgtn.bdimg.com/it/u=4014972976,3855810213&fm=27&gp=0.jpg',
            snoring_flag: true,
            status: 1,
            phone_number: '18165359296',
            callSendPhone: '18165359296',
            address: {
                province: '陕西省',
                city: '西安市',
                area: '碑林区',
                detail: '夏家庄风和日丽小区9号楼10',
            },
        };
        const result = await ctx.service.user.createMerchant('326752', message);
        console.log(result);
    });
    it('updatePassword', async () => {
        const result = await ctx.service.user.updatePassword('326752', '123456', '123456789');
        console.log(result);
    });
    it('getUserId', async() => {
        const userId = await ctx.service.user.forgetPassword('123456789', '123', 1234);
        console.log(userId);
    });
    it('listMerchant', async () => {
        const merchants = await ctx.service.user.listMerchant('209858');
        console.log(merchants);
    });
    it('modifyRemark', async () => {
        const result = await ctx.service.user.modifyRemark(['326752', '209858'], '老朋友');
        console.log(result);
    });
    it('addUserCoupon', async () => {
        const result = await ctx.service.user.addUserCoupon('326752', '469896');
        console.log(result);
    });
    it('getUserCoupon', async () => {
        const coupons = await ctx.service.user.getUserCoupon('326752');
        console.log(coupons);
    });
    it('getOrder', async () => {
        const orders = await ctx.service.user.getOrder('326752');
        console.log(orders);
    });
});
