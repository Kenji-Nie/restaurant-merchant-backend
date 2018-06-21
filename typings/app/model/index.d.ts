// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import SchemaSeatType from '../../../app/model/schema/seatType';

declare module 'sequelize' {
  interface Sequelize {
    Schema: {
      SeatType: ReturnType<typeof SchemaSeatType>;
    };
  }
}
