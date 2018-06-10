// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Base from '../../../app/controller/base';
import Merchandise from '../../../app/controller/merchandise';
import MerchandiseType from '../../../app/controller/merchandiseType';
import Merchant from '../../../app/controller/merchant';
import Order from '../../../app/controller/order';
import Region from '../../../app/controller/region';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    base: Base;
    merchandise: Merchandise;
    merchandiseType: MerchandiseType;
    merchant: Merchant;
    order: Order;
    region: Region;
    user: User;
  }
}
