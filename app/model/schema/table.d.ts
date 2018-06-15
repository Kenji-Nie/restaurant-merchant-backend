namespace model.schema {
    export interface Table {
        table_number: string;
        type: {} & Type;
        seats: number;
        qrcode_url: string;
        deletion_flag?: boolean;
    }
}
