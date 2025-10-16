const Firebird = require('node-firebird');
const opt = {
  host: '127.0.0.1',
  port: 3050,
  database: "/home/icaruswings/projects/curso/turma-0/aula2/api/PRODUCTS.GDB",
  user: 'SYSDBA',
  password: 'masterkey',
  lowercase_keys: false, // set to true to lowercase keys
  role: null,            // default
  pageSize: 4096,        // default when creating database
  retryConnectionInterval: 1000, // reconnect interval in case of connection loss
  encoding: 'utf8' // default
}

Firebird.attach(opt, function (err, db) {
  console.log(opt.database);
  
  if (err) throw err;

  db.query('SELECT * FROM PRODUTO', function (err, result) {
    db.detach();
  });
});