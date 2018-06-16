namespace model.schema {
    export interface Coupon {
        name: string;
        type: number;
        every_amount: number;
        stock: number;
        money_limit: number;
        value: number;
        merchant_ids?: string[];
        expired_date?: string;
    }
}