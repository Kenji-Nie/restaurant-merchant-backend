// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import ExtendObject from '../../../app/extend/application';
declare module 'egg' {
  interface Application {
    arango: typeof ExtendObject.arango;
    aql: typeof ExtendObject.aql;
    model: typeof ExtendObject.model;
  }
}