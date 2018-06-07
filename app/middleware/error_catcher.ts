import { ArangojsError, ArangojsResponse } from 'arangojs/lib/cjs/util/request';

export default options => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            ctx.body = {
                message: e.message,
                name: e.name,
                isArangoError: e.isArangoError,
                statusCode: e.statusCode,
                errorNum: e.errorNum,
                code: e.code,
            }
        }
    }
}
