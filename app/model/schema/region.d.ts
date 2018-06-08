namespace model.schema {
    export interface Region {
        name: string;
        parent_id: string;
        deletion_flag?: boolean;
    }
}