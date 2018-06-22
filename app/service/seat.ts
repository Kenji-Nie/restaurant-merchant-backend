import BaseService from './base';
import {aql} from "arangojs/lib/async/aql-query";

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
    public async createSeat(type_fid: string, sequence_number: string, merchant_id: string) {
        const self = this;
        const action = String(function (params) {
            return self.model.seat.save({sequence_number: params.sequence_number, type_fid: params.type_fid, stauts: 0});
        });
        const result = await this.db.transaction({write: 'seat'}, action, {sequence_number, type_fid});
    }
}
