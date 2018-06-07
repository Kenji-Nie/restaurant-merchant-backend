import { Service, Context } from 'egg';
import {Model} from '../../lib/model-proxy';
import {Database} from 'arangojs';

export default class BaseService extends Service {

    protected model : Model;
    protected db : Database;
    protected collectionName : string;

    constructor(ctx: Context,collectionName : string) {
        super(ctx);
        this.model = ctx.app.model;
        this.db = this.app.arango;
        this.collectionName = collectionName;
    }

    public async query () {
        console.log(this.collectionName);
    }

}