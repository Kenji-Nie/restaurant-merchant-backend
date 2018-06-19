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
            await this.service.seat.updateSeatStatus(ids.split(','), this.ctx.request.body.status);
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
            const merchant = await this.ctx.service.merchant.findMerchantAndSeatById(this.ctx.request.body.merchant_id);
            const seats = merchant.seats;
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

}