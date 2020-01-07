var mysql = require('mysql');

var connection;

if (process.env.JAWSDB_URL) {
  console.log('wow');
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  console.log('wow');
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 8889,
    database: 'ecs6mvtgm0eefxmr'
  });
}

connection.connect();

module.exports = connection;
