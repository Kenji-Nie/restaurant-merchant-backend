namespace model.schema {
    export interface Func {
        name: string;
        code: string;
        url: string;
        parent_id: string;
        deletion_flag?: boolean;
    }
}
