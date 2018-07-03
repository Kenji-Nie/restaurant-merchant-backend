import BaseController from './base';

export default class SeatController extends BaseController {

    /**
     * 根据席位IDS删除席位
     * @returns {Promise<void>}
     */
    public async deleteSeats() {
        const ids = this.ctx.request.body.seat_ids.toString();
        try {
            this.ctx.body = {
                status: await this.service.seat.deleteSeats(ids.split(','))
            }
        }
        catch (e) {
            this.ctx.body = {
                status: false
            }

        }
    }

    /**
     * 根据席位IDS及状态更新席位状态
     * @returns {Promise<void>}
     */
    public async updateSeatStatus() {
        const ids = this.ctx.request.body.seat_ids.toString();
        try {
            await this.service.seat.updateSeatStatus(ids.split(','), Number(this.ctx.request.body.status));
            this.ctx.body = {
                status: true
            }
        }
        catch (e) {
            this.ctx.body = {
                status: false
            }

        }
    }


    /**
     * 根据店铺ID查询所有席位
     * @returns {Promise<void>}
     */
    public async listSeat() {
        try {
            const seats = await this.ctx.service.seat.listSeatByMerchantId(this.ctx.request.body.merchant_id);
            this.ctx.body = {
                status: true,
                message: {
                    seats
                }
            }
        }
        catch (e) {
            this.ctx.body = {
                status: false,
                message: {
                    seats: []
                }
            }

        }
    }

    /**
     * 根据店铺ID，席位类型ID,席位编号创建席位
     * @returns {Promise<void>}
     */
    public async createSeat() {
        try {
            const seatId = await this.ctx.service.seat.createSeat(this.ctx.request.body.type_fid, this.ctx.request.body.sequence_number, this.ctx.request.body.merchant_id, this.ctx.request.body.people_num);
            this.ctx.body = {
                status: true,
                message: {
                    seatId
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
