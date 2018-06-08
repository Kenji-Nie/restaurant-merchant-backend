import {aql, Database} from 'arangojs';
import {DocumentCollection} from 'arangojs/lib/cjs/collection';
import {Context, Service } from 'egg';
import {Model} from '../../lib/model-proxy';
import {AqlLiteral, AqlQuery} from "arangojs/lib/cjs/aql-query";

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

    protected async findByProperty(property: string, value: any) {
        const query = aql`for o in ${this.collection} filter o.${property} == ${value} return o`;
        return await  this.db.query(query);
    }

    protected async findByProperies(properties: string[], values: any[]) {
        let conditions = ``;
        for(let i = 0; i < properties.length; i++){
            if(typeof values[i] == 'string')
                conditions += ` o.${properties[i]} == '${values[i]}'  && `;
            else
                conditions += ` o.${properties[i]} == ${values[i]}  && `;
        }
        conditions = conditions.substr(0, conditions.length - 3);
        const query = `for o in ${this.className} filter ` + conditions + `return o`;
        return await  this.db.query(query);
    }

    protected async query(query: string | AqlQuery | AqlLiteral) {
        return await this.db.query(query);
    }
}
