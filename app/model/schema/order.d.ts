namespace model.schema {
    export interface Order {
        type_fid: string;
        status: number;
        expense_date: string;   //消费时间
        merchandise_ids?: string[];
        coupon_ids?: string[];
        address: Address;
        due: number;    //应付款
        paid: number;
        deletion_flag?: boolean;
    }
}
