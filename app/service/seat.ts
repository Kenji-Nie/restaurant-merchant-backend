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
}
