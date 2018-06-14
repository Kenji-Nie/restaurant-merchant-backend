import { Scanner } from 'directory-scanner';
import * as path from 'path';

export default app => {
    initDb(app);
}

async function initDb(app) {
    const scanner = new Scanner()
    scanner.fileHandler = (o, fn, fp) => {
        o[fn] = path.basename(fn, '.d.ts');
    }

    const db = app.arango;
    const dbName = 'px_restaurant';
    try {
        await db.useDatabase(dbName);
        await db.useBasicAuth('root', 'root');
    } catch (e) {
        try {
            await db.createDatabase(dbName);
            await db.useDatabase(dbName);
            const obj = scanner.scan(path.resolve(app.baseDir, './app/model/schema'));
            Object.values(obj).forEach(async v => {
                try {
                    const collection = db.collection(v);
                    await collection.create();
                    await collection.load();
                } catch (e) {}
            })
        } catch (e) {}
    }

}
