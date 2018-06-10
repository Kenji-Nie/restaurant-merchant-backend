import {aql, Database} from 'arangojs';
import {AqlLiteral, AqlQuery} from 'arangojs/lib/cjs/aql-query';
import {DocumentCollection} from 'arangojs/lib/cjs/collection';
import {Context, Service} from 'egg';
import {Model} from '../../lib/model-proxy';

export default class BaseService extends Service {

    protected model: Model;
    protected db: Database;
    protected className: string;
    protected collection: DocumentCollection;
    constructor(ctx: Context) {
        super(ctx);
        this.model = ctx.app.model;
        this.db = this.app.arango;
        this.className = this.constructor.name.replace('Service', '').toLowerCase();
        this.collection = this.db.collection(this.className);
    }

    private static doProperiesConditions(properties: string[], values: any[]) {
        let conditions = ``;
        for (let i = 0; i < properties.length; i++) {
            if (typeof values[i] === 'string') {
                conditions += ` o.${properties[i]} == '${values[i]}'  && `;
            } else {
                conditions += ` o.${properties[i]} == ${values[i]}  && `;
            }
        }
        return conditions.substr(0, conditions.length - 3);
    }

    private static doInnnerJoinConditions(children: string[]) {
        let conditions = ``;
        let returnChildren = ``;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            conditions += ` let rs${i} = (
                                for r${i} in ${child} 
                                    filter r${i}._key in o.${child}_ids 
                                return r${i}
                            )
                          `;
            returnChildren += `{${child}s: rs${i}},`;
        }
        returnChildren = returnChildren.substr(0, returnChildren.length - 1);
        return conditions + ` return merge(o, ${returnChildren})`;
    }

    protected async query(query: string | AqlQuery | AqlLiteral) {
        return await this.db.query(query);
    }

    protected async findByProperty(property: string, value: any) {
        const query = aql`for o in ${this.collection} filter o.${property} == ${value} return o`;
        return await this.query(query);
    }

    protected async findByProperies(properties: string[], values: any[]) {
        const query = `for o in ${this.className} filter ` +
            BaseService.doProperiesConditions(properties, values) + `return o`;
        return await  this.query(query);
    }

    protected async findInnnerJoinById(fatherId: string, children: string[]) {
        const query = `for o in ${this.className} 
                           filter o._key == '${fatherId}'` + BaseService.doInnnerJoinConditions(children);
        return await this.query(query);
    }

    protected async findInnnerJoinByProperies(properties: string[], values: any[], children: string[]) {
        const query = `for o in ${this.className} filter ` +
            BaseService.doProperiesConditions(properties, values) +
            BaseService.doInnnerJoinConditions(children);
        return await this.query(query);
    }
}
