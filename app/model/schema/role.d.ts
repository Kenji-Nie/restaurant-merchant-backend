namespace model.schema {
    export interface Role {
        name: string;
        permissions: Func[];
        deletion_flag?: boolean;
    }
}
