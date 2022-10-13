let json2xls = require('json2xls')
let mysql      = require('mysql');
let fs = require('fs')

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  port     : '3306',
  database : 'a19100222'
});
 
connection.connect();
 
connection.query('SELECT * FROM videojuego', function (error, results, fields) {
  if (error) throw error;
 // console.log(results);
  var xls = json2xls(results);
  fs.writeFileSync('./excel/data.xlsx', xls, 'binary');
});
connection.end();