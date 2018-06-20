// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import ErrorHandler from '../../../app/middleware/error_handler';
import ResponseWrapper from '../../../app/middleware/response_wrapper';

declare module 'egg' {
  interface IMiddleware {
    errorHandler: ReturnType<typeof ErrorHandler>;
    responseWrapper: ReturnType<typeof ResponseWrapper>;
  }
}
