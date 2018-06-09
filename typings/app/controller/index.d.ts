// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Base from '../../../app/controller/base';
import Home from '../../../app/controller/home';
import Region from '../../../app/controller/region';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    base: Base;
    home: Home;
    region: Region;
    user: User;
  }
}
