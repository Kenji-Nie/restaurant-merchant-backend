// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Address from '../../../app/service/address';
import Base from '../../../app/service/base';
import Home from '../../../app/service/home';
import Merchandise from '../../../app/service/merchandise';
import Region from '../../../app/service/region';
import User from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    address: Address;
    base: Base;
    home: Home;
    merchandise: Merchandise;
    region: Region;
    user: User;
  }
}
