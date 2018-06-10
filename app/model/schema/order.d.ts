namespace model.schema {
    export interface Order {
        type: {} & Type;
        status: {
            name: string;
            code: string;
            deletion_flag?: boolean;
        };
        expense_date: string;   //消费时间
        merchandise_ids?: string[];
        coupon_ids?: string[];
        destination: Address;
        due: number;    //应付款
        paid: number;
        deletion_flag?: boolean;
    }
}
