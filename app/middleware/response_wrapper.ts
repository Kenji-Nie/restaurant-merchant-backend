import * as uuid from 'uuid/v4';

export default options => {
    return async (ctx, next) => {
        ctx.body = {};
        try {
            const res = await next();
            res && Object.assign(ctx.body || {}, res, {
                traceId: uuid(),
            });
        } catch (e) {
            ctx.logger.error(e);
        }
    }
}
