import { Service, Context } from 'egg';
import {Model} from '../../lib/model-proxy';
import {Database} from 'arangojs';

export default class BaseService extends Service {

    protected model : Model;
    protected db : Database;
    protected className : String;

    constructor(ctx: Context) {
        super(ctx);
        this.model = ctx.app.model;
        this.db = this.app.arango;
        this.className = this.constructor.name.replace("Service", "");
    }

    public async query () {
        let className = (/function (.{1,})\(/).exec(this.constructor.toString());
        let x = (className && className.length > 1) ? className[1] : "";
        console.log(this.className);
    }

}