namespace model.schema {
    export interface Merchant {
        name: string;
        type: {} & Type;
        legal_person: {
            name: string;
            id_card: string;
        };
        business_license: {
            license_number: string;
            image: string;
        };
        phone?: string;
        registration_date: string;
        snoring_flag: boolean;
        open_time: string;
        close_time: string;
        takeaway: {
            snoring_flag: boolean;
            open_time: string;
            close_time: string;
            min_amount: number;
            max_distance: number;
        };
        merchandise_ids?: string[];
        merchandise_types?: string[];
        coupon_ids?: string[];
        merchandiseType_ids?: string[];
        order_ids?: string[];
        table_ids?: string[];
        ad_ids?: string[];
        deletion_flag?: boolean;
    }
}
// "admin_id": "001",
//     "mainInformation": "未认证",
//     "storeStatus": "营业中",
//     "storeAvatar": "http://img3.imgtn.bdimg.com/it/u=4014972976,3855810213&fm=27&gp=0.jpg",
//     "workTimes": {
//     "week": "数组的默认值不能解析为数组: 周一 周二",
//         "startTime": "08:00",
//         "endTime": "22:00"
// },
//     "phone_number": "18165359296",
//     "callSendPhone": "18165359296",
//     "address": {
//     "provice": "陕西省",
//         "city": "西安市",
//         "area": "碑林区",
//         "detail": "夏家庄风和日丽小区9号楼101"}
