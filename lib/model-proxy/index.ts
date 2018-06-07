import { Database, aql } from 'arangojs';
import { DocumentCollection } from 'arangojs/lib/cjs/collection';

export type Model = {
    [T in keyof model.schema]: {
        [prop: string]: model.schema[T];
    } & DocumentCollection;
};

export default (db: any): Model => {
    return new Proxy(db, {
        get: collection(db),
    });
}

function collection(db: Database) {
    return (_, key) => {
        if (inspectFilter(key)) {
            const collection = db.collection(key);
            return new Proxy(collection, {
                get: property(collection),
            });
        }
    }
}

function property(collection: DocumentCollection) {
    return (_, key) => {
        if (inspectFilter(key)) {
            if (typeof collection[key] === 'function') {
                return collection[key].bind(collection) as Function;
            }
            if (typeof key === 'object') {
                console.log('obj')
            }
            return collection.document(key);
        }
    }
}

function inspectFilter(value): boolean {
    const filter = ['inspect', 'valueOf'];
    if (typeof value === 'symbol' || filter.includes(value)) {
        return false;
    }
    return true;
}
