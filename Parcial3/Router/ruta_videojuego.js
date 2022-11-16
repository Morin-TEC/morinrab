const MySQL      = require('./MySQL');

var express=require('express');
var router= express.Router()

router.get('', (req, res) => {
    var connection = MySQL.getConnection();
    MySQL.selectQuery(connection).then(function(results){
        res.send(results)
    })
  });
  
router.get('/:ID', (req, res) => {
    var connection = MySQL.getConnection();
    MySQL.selectWhere(connection,req.params.ID).then(function(results){
        res.send(results)
    })
  });
  
router.post('/agregar',(req,res)=> {
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
  
router.patch('/modificar',(req,res)=> {
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
  
router.delete('/eliminar',(req,res)=> {
    let ID = req.body.ID;
  
    var connection = MySQL.getConnection();
    MySQL.deleteQuery(connection,ID).then(function(results){
        res.send(results)
    })
  });
  
router.post('', (req,res) => {
    res.send('Servidor Express Recibio POST');
  });

module.exports.router=router;