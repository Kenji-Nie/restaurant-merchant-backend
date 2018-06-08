namespace model.schema {
    export interface Theme {
        name: string;
        desc: string;
        style_sheet: string;
        deletion_flag?: boolean;
    }
}