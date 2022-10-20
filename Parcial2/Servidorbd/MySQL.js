const express = require('express');
let mysql      = require('mysql');
const app = express()

app.use(express.text())
app.use(express.json())


app.get('/:ID',(req,res) => {

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  port     : '3306',
  database : 'a19100222'
})
connection.connect();
 
connection.query('SELECT * FROM videojuego WHERE ID = ' + req.params.ID, function (error, results, fields) {
  if (error) throw error;
 // console.log(results);
  res.send(results)});
connection.end();
});

app.listen(8082,()=>{
  console.log('Server express 8082 escuchando correctamente')
});