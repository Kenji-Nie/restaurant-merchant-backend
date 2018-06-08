namespace model.schema {
    export interface Role {
        name: string;
        permissions: {}[];
        deletion_flag?: boolean;
    }
}