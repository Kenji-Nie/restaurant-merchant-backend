import BaseService from './base';
import SeatType = model.schema.SeatType;
import {aql} from "arangojs/lib/async/aql-query";

export default class SeatTypeService extends BaseService {

    /**
     * 根据席位类型ID更新席位
     * @param {string} id
     * @param {model.schema.SeatType} seatType
     * @returns {Promise<any>}
     */
    public async updateSeatType(id: string, seatType: SeatType) {
        return await this.model.seatType.update(id, seatType);
    }

    /**
     * 根据席位类型IDS删除席位类型
     * @param {string[]} ids
     * @returns {Promise<boolean>}
     */
    public async deleteSeatTypes(ids: string[], merchant_id: string) {
        const query = aql`let sids=(for s in seat filter s.type_fid in ${ids} return s._key) 
        for m in merchant filter m._key==${merchant_id} 
        update m with {seat_ids:REMOVE_VALUES(m.seat_ids,sids),seatType_ids:REMOVE_VALUES(m.seatType_ids,${ids})} in merchant 
        for st in seatType filter st._key in ${ids} remove st in seatType 
        for s in seat filter s.type_fid in ${ids}  remove s in seat `;
        return await this.query(query);
    }

    /**
     * 根据店铺ID及席位名称添加席位
     * @param {string} merchant_id
     * @param {string} name
     * @returns {Promise<any | undefined>}
     */
    public async creatSeatType(merchant_id: string, name: string) {
        const query = `let seatTypeId = (insert {name: '${name}'} into seatType return NEW._key)  
        for m in merchant filter m._key == '${merchant_id}' 
        update m with { seatType_ids: APPEND(m.seatType_ids,seatTypeId)} in merchant return seatTypeId`;
        return await (await this.query(query)).next();
    }

    /**
     * 根据商户ID返回桌位类型
     * @param {string} merchant_id
     * @returns {Promise<any>}
     */
    public async listSeatTypeByMerchantId(merchant_id: string) {
        const query = `for m in merchant filter m._key == "${merchant_id}" 
            for st in seatType filter st._key in m.seatType_ids 
            let s = (for s in seat filter s.type_fid == st._key return s) 
            return merge(st,{seatCount:LENGTH(s)})`;
        return await (await this.query(query)).all();
    }
}
