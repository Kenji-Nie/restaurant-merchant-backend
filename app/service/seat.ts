import BaseService from './base';
import string from "../extend/lib/string";
import ArrayUtils from "../utils/arrayUtils";
import {aql} from "arangojs";

export default class SeatService extends BaseService {


    /**
     * 根据席位IDS删除席位
     * @param {string[]} ids
     * @returns {Promise<boolean>}
     */
    public async deleteSeats(ids: string[]) {
        return !(await this.model.seat.removeByKeys(ids, {})).error;
    }

    /**
     * 根据席位IDS及状态更新席位状态
     * @param {string[]} ids
     * @param {number} status
     * @returns {Promise<void>}
     */
    public async updateSeatStatus(ids: string[], status: number) {
        const query = aql`for s in seat filter s._key in ${ids}
                       update s with { status: ${status} } in seat`;
        await this.query(query);
    }

    /**
     * 根据店铺ID，席位类型ID,席位编号创建席位
     * @param {string} type_fid
     * @param {string} sequence_number
     * @param {string} merchant_id
     * @returns {Promise<void>}
     */
    public async createSeat(type_fid: string, sequence_number: string, merchant_id: string, people_num: number) {
        const query = `let seatId = (insert {sequence_number: '${sequence_number}',
        type_fid: '${type_fid}', people_num: ${people_num},qrcode_url:'',stauts:1} into seat return NEW._key)  
        for m in merchant filter m._key == '${merchant_id}' 
        update m with { seat_ids: APPEND(m.seat_ids,seatId)} in merchant return seatId`;
        return await (await this.query(query)).next();
    }

    /**
     * 根据店铺ID查询席位
     * @param {string} merchant_id
     * @returns {Promise<any>}
     */
    public async listSeatByMerchantId(merchant_id: string) {
        const query = `for m in merchant filter m._key == "${merchant_id}" 
        for s in seat filter s._key in m.seat_ids 
        let st = (for st in seatType filter st._key ==  s.type_fid return st.name) 
        return merge(s,{seatType:FIRST(st)})`;
        return await (await this.query(query)).all();
    }
}
