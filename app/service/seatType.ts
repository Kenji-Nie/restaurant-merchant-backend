import BaseService from './base';
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
}
