// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Address from '../../../app/service/address';
import Base from '../../../app/service/base';
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
    address: Address;
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
