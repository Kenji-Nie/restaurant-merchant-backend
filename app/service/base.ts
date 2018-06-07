import { Service, Context } from 'egg';
import {Model} from '../../lib/model-proxy';
import {Database} from 'arangojs';

export default class BaseService<T> extends Service {

    protected model : Model;
    protected db : Database;

    constructor(ctx: Context) {
        super(ctx);
        this.model = ctx.app.model;
        this.db = this.app.arango;
    }

}