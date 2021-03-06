import {Context} from 'egg';
import {app} from 'egg-mock/bootstrap';

describe('merchantTest', async () => {
    let ctx: Context;
    before(async () => {
        ctx = app.mockContext();
    });
    /*it('getMerchants', async () => {
        const merchants = await ctx.service.merchant.getMerchants('121223');
        console.log(merchants);
    });*/
    // it('updateMerchant', async () => {
    //     const storeMessage = {
    //         type_fid: 'merchantType/001',
    //         name: '微笑宝贝1',
    //         legal_person_name: 'zhangsan',
    //         legal_person_id_card: '',
    //         business_license_number: '',
    //         business_license_img: '',
    //         merchant_type_fid: '餐饮',
    //         mainInformation: '未认证',
    //         storeStatus: '营业中',
    //         sign_up_date: '',
    //         snoring_flag: true,
    //         open_time: '08:00',
    //         close_time: '22:00',
    //         takeaway_snoring_flag: '',
    //         takeaway_open_time: '',
    //         takeaway_close_time: '',
    //         min_takeaway_amount: '',
    //         max_takeaway_distance: '',
    //         status: 1,
    //         storeAvatar: 'http://img3.imgtn.bdimg.com/it/u=4014972976,3855810213&fm=27&gp=0.jpg',
    //         workTimes: {
    //             week: [
    //                 'mxnEfK44aa',
    //                 'MXhzu58DVj',
    //                 'k552DyJWUH',
    //             ],
    //         },
    //         phone: '18165359296',
    //         callSendPhone: '18165359296',
    //         address: {
    //             province: '陕西省',
    //             city: '西安市',
    //             area: '碑林区',
    //             detail: '夏家庄风和日丽小区9号楼101',
    //         },
    //     };
    //     const result = await ctx.service.merchant.updateMerchant('326752', storeMessage);
    //     // console.log(result);
    // });
     it ('deleteMerchant', async () => {
         const result = await ctx.service.merchant.deleteMerchant('561456');
         // console.log(result);
     });
    // it('findMerchantAndSeatById', async () => {
    //    const result = await ctx.service.merchant.findMerchantAndSeatById('461123');
    // console.log(result);
    // });
    // it('listMerchantUser', async () => {
    //     const users = await ctx.service.merchant.listMerchantUser('461123');
    //     // console.log(users);
    // });
    // it('getOrderIncomeAndRefond', async () => {
    //     const income = await ctx.service.merchant.getOrderIncomeAndRefond('461123', '2018-1-1');
    //     // console.log(income);
    // });
    // it('getOrderIncomeAndRefond', async () => {
    //     const income = await ctx.service.merchant.getOrderIncomeAndRefond('461123', '2018-1-1');
    //     // console.log(income);
    // });

    // it('updateTakeoutAmount', async () => {
    //     const result = await ctx.service.merchant.updateTakeoutAmount('1188314', 10);
    //     console.log(result);
    // });

    it('updateReservedLockTime', async () => {
        const result = await ctx.service.merchant.updateReservedLockTime('1188314', 30);
        console.log(result);
    });
    it('getMerchantCoupon', async () => {
        const coupons = await ctx.service.merchant.getMerchantCoupon('1188314');
        console.log(coupons);
    });
    it('getMerchant', async () => {
        const merchant = await ctx.service.merchant.getMerchant('1188314');
        console.log(merchant);
    });
});
