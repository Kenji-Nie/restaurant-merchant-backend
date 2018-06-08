namespace model.schema {
    export interface Icon {
        name: string;
        type: {} & Type;
        url: string;
        deletion_flag?: boolean;
    }
}