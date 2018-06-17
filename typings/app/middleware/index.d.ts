// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import ErrorCatcher from '../../../app/middleware/error_catcher';
import ErrorHandler from '../../../app/middleware/error_handler';
import ResponseWrapper from '../../../app/middleware/response_wrapper';

declare module 'egg' {
  interface IMiddleware {
    errorCatcher: typeof ErrorCatcher;
    errorHandler: typeof ErrorHandler;
    responseWrapper: typeof ResponseWrapper;
  }
}
