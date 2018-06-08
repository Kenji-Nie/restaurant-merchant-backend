namespace model.schema {
    export interface Address {
        longitude: string;
        latitude: string;
        province_id: string;
        city_id: string;
        county_id: string;
        extra_info: string;
        deletion_flag?: boolean;
    }
}
