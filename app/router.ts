import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa';
import { Application } from 'egg';
import { makeExecutableSchema } from 'graphql-tools';
import * as path from 'path';
import { loader } from '../lib/graphql-module-loader/src';

export default (app: Application) => {
    const { controller, router } = app;

    router.post(
        '/graphql',
        graphqlKoa((ctx) => {
            return {
                schema: makeExecutableSchema(loader(path.resolve(app.baseDir, 'app/graphql'))),
                context: ctx,
            };
        }),
    );

    router.get(
        '/graphql',
        graphiqlKoa({
            endpointURL: '/graphql', // a POST endpoint that GraphiQL will make the actual requests to,
            // passHeader: `'Authorization': 'Bearer lorem ipsum'`,
        }),
    );
    router.resources('wx-pay', '/api/payment/wx-pay', controller.wxPay.create);
    router.get('/api/:controller/:method/:rest?', (ctx, next) => {
        const { helper } = ctx;
        const p = helper.modifyValues(ctx.params, helper.camelize);
        try {
            return (controller[p.controller][p.method]).apply(ctx,p);
        } catch (e) {
            return new helper.SysError(`'${ctx.url}' resource not found`);
        }
    });

    router.post('/api/:controller/:method', (ctx, next) => {
        const { helper } = ctx;
        const p = helper.modifyValues(ctx.params, helper.camelize);
        try {
            return (controller[p.controller][p.method]).apply(ctx, p);
        } catch (e) {
            return new helper.SysError(`'${ctx.url}' resource not found`);
        }
    });
};
