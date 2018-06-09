import { Application } from 'egg';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { makeExecutableSchema } from 'graphql-tools';
import { loader } from '../lib/graphql-module-loader/src';
import * as path from 'path';

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
    // router.get('/', controller.home.index);
    // router.post('/api/user/login/loginData',controller.user.login);
    // router.get('/api/getAddress', controller.region.getRegions);
    router.post('/api/:version/:module?/:controller/:method/:rest?', (ctx, next) => {
        const { helper } = ctx;
        const p = helper.modifyValues(ctx.params, helper.camelize);
        try {
            return (p.module ?
                controller.api[p.version][p.module][p.controller][p.method] :
                controller.api[p.version][p.controller][p.method]).apply(ctx, p.rest);
        } catch (e) {
            // ctx.logger.error(e);
            return new helper.SysError(`'${ctx.url}' resource not found`);
        }
    })

};
