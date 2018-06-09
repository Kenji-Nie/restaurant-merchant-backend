namespace model.schema {
    export interface User {
        type: {} & Type;
        username: string;
        password: string;
        name?: string;
        wx_uid?: string;
        phone?: string;
        email?: string;
        registration_date: string;
        role_ids?: string[];
        order_ids?: string[];
        coupon_ids?: string[];
        addresses?: Address[];
        id_card?: string;       // admin only
        merchants?: Merchant[]; // admin only
        deletion_flag?: boolean;
    }
}
