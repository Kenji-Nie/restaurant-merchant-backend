// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Ad from '../../../app/service/ad';
import Address from '../../../app/service/address';
import Admin from '../../../app/service/admin';
import Base from '../../../app/service/base';
import Func from '../../../app/service/func';
import Merchandise from '../../../app/service/merchandise';
import MerchandiseType from '../../../app/service/merchandiseType';
import Merchant from '../../../app/service/merchant';
import Order from '../../../app/service/order';
import Region from '../../../app/service/region';
import Seat from '../../../app/service/seat';
import SeatType from '../../../app/service/seatType';
import User from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    ad: Ad;
    address: Address;
    admin: Admin;
    base: Base;
    func: Func;
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
