namespace model.schema {
    export interface Admin {
        type: {} & Type;
        username: string;
        password: string;
        name: string;
        id_card: string;
        wx_uid: string;
        phone: string;
        email: string;
        sign_ur_date: string;
        role_ids?: string[];
        merchants?: Merchant[];
        delete_flag?: boolean;
    }
}
