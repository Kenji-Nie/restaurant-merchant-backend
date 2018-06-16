namespace model.schema {
    export interface Merchandise {
        name: string;
        type_fid: string;
        sale_volume: number;
        current_price: number;
        original_price: number;
        sequence_number: number;
        packing_charge: number;
        min_img: string;
        image_ids: string[];
        video_ids: string[];
        detail: string;
        shelf_flag?: boolean;  // 上架标志
    }
}
