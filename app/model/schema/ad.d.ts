namespace model.schema {
    export interface Ad {
        name: string;
        type: {} & Type;
        url: string;
        image: string;
        video: string;
        deletion_flag?: boolean;
    }
}