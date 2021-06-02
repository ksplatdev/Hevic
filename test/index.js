const hevic = require('../dist/index').default;

let myDb = new hevic.db('test/db.json', { debug: true });
let data = myDb.data;

// push to array
data.users.push({ name: 'test' });

myDb.update(data);
