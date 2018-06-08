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
        coupon_types?: string[];
        order_ids?: string[];
        table_ids?: string[];
        ad_ids?: string[];
        deletion_flag?: boolean;
    }
}