const express = require('express');
const MySQL      = require('./MySQL');
const cors = require('cors');
const app = express()

app.use(express.text())
app.use(express.json())
app.use(cors({origin:"http://localhost"}))


app.get('/', (req, res) => {
  var connection = MySQL.getConnection();
  MySQL.selectQuery(connection).then(function(results){
      res.send(results)
  })
});

app.get('/:ID', (req, res) => {
  var connection = MySQL.getConnection();
  MySQL.selectWhere(connection,req.params.ID).then(function(results){
      res.send(results)
  })
});

app.post('/agregar',(req,res)=> {
  let videojuego = {
  "inputTituloVideojuego" : req.body.inputTituloVideojuego,
  "Genero" : req.body.Genero,
  "inputPrecio" : req.body.inputPrecio,
  "Fecha" : req.body.Fecha
  };

  var connection = MySQL.getConnection();
  MySQL.createQuery(connection,videojuego).then(function(results){
      res.send(results)
  })
});

app.patch('/modificar',(req,res)=> {
  let videojuego = {
    "id" : req.body.id,
    "inputTituloVideojuego" : req.body.inputTituloVideojuego,
    "Genero" : req.body.Genero,
    "inputPrecio" : req.body.inputPrecio,
    "Fecha" : req.body.Fecha
    };

  var connection = MySQL.getConnection();
  MySQL.modifyQuery(connection,videojuego).then(function(results){
      res.send(results)
  })
});

app.delete('/eliminar',(req,res)=> {
  let ID = req.body.ID;

  var connection = MySQL.getConnection();
  MySQL.deleteQuery(connection,ID).then(function(results){
      res.send(results)
  })
});

app.post('/', (req,res) => {
  res.send('Servidor Express Recibio POST');
});

app.listen(8082,()=>{
  console.log('Server express 8082 escuchando correctamente')
});