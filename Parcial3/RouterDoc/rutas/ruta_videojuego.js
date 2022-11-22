const MySQL = require('C:/xampp/htdocs/morinrab/morinrab/Parcial3/RouterDoc/MySQL');

var express=require('express');
var router= express.Router()

/**
 * @swagger
 * /videojuego:
 *   get:
 *     description: Mira todos los videojuegos disponibles!
 *     responses:
 *          200:
 *            description: Returns a mysterious string.
 */
router.get('', (req, res) => {
    var connection = MySQL.getConnection();
    MySQL.selectQuery(connection).then(function(results){
        res.send(results)
    })
  });

/**
 * @swagger
 * /ID:
 *   get:
 *     description: Escoge el videojuego por su ID
 *     responses:
 *          200:
 *            description: Returns a mysterious string.
 */
router.get('/:ID', (req, res) => {
    var connection = MySQL.getConnection();
    MySQL.selectWhere(connection,req.params.ID).then(function(results){
        res.send(results)
    })
  });

/**
 * @swagger
 * /agregar:
 *   post:
 *     description: Agrega un videojuego
 *     responses:
 *          200:
 *            description: Returns a mysterious string.
 */
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

/**
 * @swagger
 * /modificar:
 *   patch:
 *     description: Modifica los datos del videojuego.
 *     responses:
 *          200:
 *            description: Returns a mysterious string.
 */  
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

/**
 * @swagger
 * /eliminar:
 *   delete:
 *     description: Elimina un videojuego
 *     responses:
 *          200:
 *            description: Returns a mysterious string.
 */  
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