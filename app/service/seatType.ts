import BaseService from "./base";
import SeatType = model.schema.SeatType;


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
    public async deleteSeatTypes(ids: string[]) {
        return !(await this.model.seatType.removeByKeys(ids, {})).error;
    }

}