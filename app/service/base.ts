import { Service, Context } from 'egg';
import {Model} from '../../lib/model-proxy';
import {aql, Database} from 'arangojs';
import {DocumentCollection} from "arangojs/lib/cjs/collection";

export default class BaseService extends Service {

    protected model : Model;
    protected db : Database;
    protected className : string;
    protected collection: DocumentCollection;

    constructor(ctx: Context) {
        super(ctx);
        this.model = ctx.app.model;
        this.db = this.app.arango;
        this.className = this.constructor.name.replace('Service', '').toLowerCase();
        this.collection = this.db.collection(this.className);
    }

    public async query () {
        console.log(this.className);
    }

    public async findByProperty(property: string, value : string) {
        const query = aql`for o in ${this.collection} filter o.${property} == ${value} return o`;
        return await this.db.query(query);
    }
}