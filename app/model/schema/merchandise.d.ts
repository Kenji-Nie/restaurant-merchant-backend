namespace model.schema {
    export interface Merchandise {
        name: string;
        type: {
            icon: string;
            sequence_number: number;
        } & Type;
        sale_volume: number;
        current_price: number;
        original_price: number;
        sequence_number: number;
        packing_charge: number;
        thumbnails: string[];
        images: string[];
        videos: string[];
        detail: string;
        putaway_flag?: boolean;  // 上架标志
        deletion_flag?: boolean;
    }
}
