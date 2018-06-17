// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Admin from '../../../app/controller/admin';
import Base from '../../../app/controller/base';
import Merchandise from '../../../app/controller/merchandise';
import MerchandiseType from '../../../app/controller/merchandiseType';
import Merchant from '../../../app/controller/merchant';
import Order from '../../../app/controller/order';
import Region from '../../../app/controller/region';
import Seat from '../../../app/controller/seat';
import SeatType from '../../../app/controller/seatType';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    admin: Admin;
    base: Base;
    merchandise: Merchandise;
    merchandiseType: MerchandiseType;
    merchant: Merchant;
    order: Order;
    region: Region;
    seat: Seat;
    seatType: SeatType;
    user: User;
  }
}
