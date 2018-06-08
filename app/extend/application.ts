import { Database, aql } from 'arangojs';
import proxy from '../../lib/model-proxy';

const ARANGO = Symbol.for('Application#arango');

export default {
    get arango(): Database {
        if (!this[ARANGO]) {
            this[ARANGO] = new Database({ url: 'http://192.168.0.115:8529' });
        }
        return this[ARANGO];
    },

    get aql() {
        return aql;
    },

    get model() {
        return proxy(this.arango);
    },
};
