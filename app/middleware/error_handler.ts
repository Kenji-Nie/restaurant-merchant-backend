export default options => {
    return async (ctx, next) => {
        try {
            return await next();
        } catch (e) {
            ctx.logger.error(e);
            return new ctx.helper.BizError(e);
        }
    }
};
