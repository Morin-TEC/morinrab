const MySQL = require('./MySQL');
var express=require('express');
var router= express.Router()

/**
 * @swagger
 * /pokemon:
 *  get:
 *      description: Devuelve todos los Pokémon
 *      responses:
 *          200:
 *              description: Listado de Pokémon
 */
 router.get('', (req, res) => {
    var connection = MySQL.getConnection();
    MySQL.selectQuery(connection).then(function(results){
        res.send(results)
    })
  });

/**
 * @swagger
 * /pokemon/{id}:
 *   get:
 *     summary: Obtener un Pokémon por ID
 *     description: Encontrar un Pokémon con su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Objeto
 *         schema:
 *           $ref: '#/components/schemas/pokemon'
 *       404:
 *         description: No fue encontrado
 */
 router.get('/:ID', (req, res) => {
    var connection = MySQL.getConnection();
    MySQL.selectWhere(connection,req.params.ID).then(function(results){
        res.send(results)
    })
  });


/**
  * @swagger
  * /pokemon/agregar:
  *   post:
  *     summary: Agrega un nuevo Pokemon
  *     requestBody:
  *       required:
  *         - ID
  *         - Nombre
  *         - Tipo
  *         - Habilidad
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/pokemon'
  *     responses:
  *       200:
  *         description: Se agrego Pokemon
  */
router.post('/agregar',(req,res)=> {
    let pokemon = {
      "ID":req.body.ID,
    "Nombre" : req.body.Nombre,
    "Tipo" : req.body.Tipo,
    "Habilidad" : req.body.Habilidad,
    "Generacion" : req.body.Generacion
    };
  
    var connection = MySQL.getConnection();
    MySQL.createQuery(connection,pokemon).then(function(results){
        res.send(results)
    })
  });

/**
  * @swagger
  * /pokemon/modificar:
  *   patch:
  *     summary: Modifica un Pokemon
  *     requestBody:
  *       required:
  *         - ID
  *         - Nombre
  *         - Tipo
  *         - Habilidad
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/pokemon'
  *     responses:
  *       200:
  *         description: Se modifico un Pokemon
  */
router.patch('/modificar',(req,res)=> {
    let pokemon = {
      "ID" : req.body.ID,
      "Nombre" : req.body.Nombre,
      "Tipo" : req.body.Tipo,
      "Habilidad" : req.body.Habilidad,
      "Generacion" : req.body.Generacion
      };
  
    var connection = MySQL.getConnection();
    var results = MySQL.modifyQuery(connection,pokemon).then(function(results){
        res.send(results)
    })
  });

/**
 * @swagger
 * /pokemon/{ID}:
 *   delete:
 *     summary: Eliminar un Pokémon
 *     description: Eliminar un Pokémon con su ID.
 *     parameters:
 *       - name: ID
 *         in: path
 *         description: ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Objeto
 *         schema:
 *           $ref: '#/components/schemas/pokemon'
 *       404:
 *         description: No fue encontrado
 */
 router.delete('/:ID',(req,res)=> {
    let ID = req.params.ID;
    var connection = MySQL.getConnection();
    var results = MySQL.deleteQuery(connection,ID).then(function(results){
    res.send(results)
    })
});

router.post('', (req,res) => {
    res.send('Servidor Express Recibio POST');
  });

module.exports.router=router;