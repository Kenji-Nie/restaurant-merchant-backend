namespace model.schema {
    export interface User {
        type_fid: string;
        username?: string;
        password?: string;
        name?: string;
        wx_uid: string;
        phone?: string;
        email?: string;
        sign_up_date: string;
        role_ids?: string[];
        order_ids?: string[];
        coupon_ids?: string[];
        address_ids?: string[];
        id_card?: string;
        merchant_ids?: string[];
        deletion_flag?: boolean;
    }
}
