namespace model.schema {
    export interface Admin {
        type_fid: string;
        username: string;
        password: string;
        name?: string;
        wx_uid?: string;
        phone?: string;
        email?: string;
        sign_up_date: string;
        id_card?: string;
    }
}
