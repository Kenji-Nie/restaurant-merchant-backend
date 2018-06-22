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
        const action = function (params) {
            const db = require('@arangodb').db;
            const seat = db._query(`insert {sequence_number: '${params.sequence_number}', type_fid: '${params.type_fid}', people_num: ${params.people_num},qrcode_url:'${params.qrcode_url}',stauts:1} into seat`);
            const merchant = db._query(`for o in merchant filter o._key == '461123' return o`).next();
            let seat_ids = new Array();
            if (merchant.seat_ids !== undefined) {
                seat_ids.push(merchant.seat_ids);
                seat_ids.push(seat._key);
                for (let i = 0; i < seat_ids.length; i++) {
                    seat_ids[i] = '\'' + seat_ids[i] + '\'';
                }
            } else {
                seat_ids.push(seat._key);
            }
            const query = `update { _key: '461123' } with { seat_ids: [${seat_ids}]} in merchant`;
            return db._query(query);
        };
        const result = await this.db.transaction({write: ['seat', 'merchant']}, String(action), {
            type_fid,
            sequence_number,
            people_num,
            qrcode_url: ''
        });
    }
}
