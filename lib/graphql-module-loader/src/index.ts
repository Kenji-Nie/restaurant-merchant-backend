import * as fs from 'fs';
import * as path from 'path';
import { Scanner } from 'directory-scanner';
import { merge } from 'lodash';

const scanner = new Scanner();

const typeDefs = new Array();

const resolvers = new Array();

scanner.fileHandler = async (o, fn, fp) => {
    const extname = path.extname(fn);
    if (extname == '.graphql') {
        const content = fs.readFileSync(fp).toString();
        typeDefs.push(content);
    }
    if (extname == '.js') {
        const resolver = require(fp);
        resolvers.push(resolver);
    }
    if (extname == '.ts') {
        const resolver = require(fp).default;
        resolvers.push(resolver);
    }
}

const loader = function (dirRealPath) {
    scanner.scan(dirRealPath);
    return { typeDefs, resolvers: merge({}, ...resolvers) };
}

export { loader };
