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
 * /pokemon/index:
 *  get:
 *      description: Index
 *      responses:
 *          200:
 *              description: Informacion general
 */
router.get('/index',(req,res)=> {
    res.send('CRUD con router')
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
   *     tags:
   *       - Pokemon
   *     summary: Agrega un nuevo Pokémon
   *     requestBody:
   *       required:
   *         - Nombre
   *         - Tipo
   *         - Habilidad
   *         - Generacion
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Pokemon'
   *     responses:
   *       200:
   *         description: Se registro de manera exitosa
   */
router.post('/agregar',(req,res)=> {
    let pokemon = {
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
   *     tags:
   *       - Pokemon
   *     summary: Actualiza un Pokémon
   *     description: Actualiza los datos de un Pokémon
   *     parameters:
   *       - in: path
   *         name: ID
   *         description: ID del Pokémon para modificar
   *         required: true
   *         schema:
   *           type: integer
   *           format: int
   *     requestBody:
   *       required:
   *         - ID
   *         - Nombre
   *         - Tipo
   *         - Habilidad
   *         - Generacion
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/pokemon'
   *     responses:
   *       200:
   *         description: Fue modificado con éxito
   */
router.patch('/modificar',(req,res)=> {
    let pokemon = {
      "ID" : req.body.id,
      "Nombre" : req.body.Nombre,
      "Tipo" : req.body.Tipo,
      "Habilidad" : req.body.Habilidad,
      "Generacion" : req.body.Generacion
      };
  
    var connection = MySQL.getConnection();
    MySQL.modifyQuery(connection,pokemon).then(function(results){
        res.send(results)
    })
  });

/**
 * @swagger
 * /pokemon/{id}:
 *   delete:
 *     tags:
 *       - Pokemon
 *     summary: Elimina un Pokémon
 *     description: Elimina un Pokémon con su ID
 *     parameters:
 *         required:
 *         - ID
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: Fue eliminado el Pokémon con éxito
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