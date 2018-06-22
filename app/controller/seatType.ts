import BaseController from './base';

export default class SeatTypeController extends BaseController {

    /**
     * 根据店铺ID查询席位类别
     * @returns {Promise<void>}
     */
    public async listSeatType() {
        try {
            const merchant = await this.ctx.service.merchant.findMerchantAndSeatTypeById(this.ctx.request.body.merchant_id);
            const seatTypes = merchant.seatTypes;
            this.ctx.body = {
                status: true,
                message: {
                    seatTypes
                }
            }
        } catch (e) {
            this.ctx.body = {
                status: false,
                message: {
                    seatTypes: []
                }
            }

        }
    }


    /**
     * 根据席位类型ID及名称更新席位
     * @returns {Promise<void>}
     */
    public async updateSeatType() {
        try {
            const rs = await this.ctx.service.seatType.updateSeatType(this.ctx.request.body.seatType_id, {name: this.ctx.request.body.name});
            this.ctx.body = {
                status: rs == null ? false : true
            }
        }
        catch (e) {
            this.ctx.body = {
                status: false,
            }

        }
    }


    /**
     * 根据席位类型IDS删除席位
     * @returns {Promise<void>}
     */
    public async deleteSeatTypes() {
        const ids = this.ctx.request.body.seatType_ids.toString();
        try {
            this.ctx.body = {
                status: await this.service.seatType.deleteSeatTypes(ids.split(','))
            }
        }
        catch (e) {
            this.ctx.body = {
                status: false
            }

        }
    }

    /**
     * 根据店铺ID及席位名称添加席位
     * @returns {Promise<void>}
     */
    public async creatSeatType() {
        try {
            const seatTypeId = await this.ctx.service.seatType.creatSeatType(this.ctx.request.body.merchant_id, this.ctx.request.body.name);
            this.ctx.body = {
                status: true,
                message: {
                    seatTypeId
                }
            }
        }
        catch (e) {
            this.ctx.body = {
                status: false,
                message: {
                    seats: ''
                }
            }

        }
    }

}
