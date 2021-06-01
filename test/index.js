const hevc = require('../dist/index').default;

let myDb = new hevc.db('test/db.json', { debug: true });
let data = myDb.data;

// push to array
data.users.push({ name: 'test' });

myDb.update(data);
