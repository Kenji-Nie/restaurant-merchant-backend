namespace model.schema {
    export interface Coupon {
        name: string;
        type: {
            formula: string;
        } & Type;
        multi_use_flag: boolean;    // 多个使用标志
        merchandise_ids?: string[];
        expired_date?: string;
        deletion_flag?: boolean;
    }
}