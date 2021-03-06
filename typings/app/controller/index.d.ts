// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Ad from '../../../app/controller/ad';
import Admin from '../../../app/controller/admin';
import Base from '../../../app/controller/base';
import Coupon from '../../../app/controller/coupon';
import Func from '../../../app/controller/func';
import Merchandise from '../../../app/controller/merchandise';
import MerchandiseType from '../../../app/controller/merchandiseType';
import Merchant from '../../../app/controller/merchant';
import Order from '../../../app/controller/order';
import Region from '../../../app/controller/region';
import Seat from '../../../app/controller/seat';
import SeatType from '../../../app/controller/seatType';
import User from '../../../app/controller/user';
import Wechat from '../../../app/controller/wechat';
import WxPay from '../../../app/controller/wxPay';

declare module 'egg' {
  interface IController {
    ad: Ad;
    admin: Admin;
    base: Base;
    coupon: Coupon;
    func: Func;
    merchandise: Merchandise;
    merchandiseType: MerchandiseType;
    merchant: Merchant;
    order: Order;
    region: Region;
    seat: Seat;
    seatType: SeatType;
    user: User;
    wechat: Wechat;
    wxPay: WxPay;
  }
}
