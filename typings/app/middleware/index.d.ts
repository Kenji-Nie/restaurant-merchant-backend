// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import ErrorCatcher from '../../../app/middleware/error_catcher';

declare module 'egg' {
  interface IMiddleware {
    errorCatcher: typeof ErrorCatcher;
  }
}
