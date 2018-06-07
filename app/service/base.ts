import { Service, Context } from 'egg';
import {Model} from '../../lib/model-proxy';

export default class BaseService extends Service {

    protected model : Model;

    constructor(ctx: Context) {
        super(ctx);
        this.model = ctx.app.model;
    }

}