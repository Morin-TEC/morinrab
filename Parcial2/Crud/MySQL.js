const mysql = require('mysql');

function getConnection(){
    var connection = mysql.createConnection(
        {
        host     : '127.0.0.1',
        user     : 'root',
        port     : '3306',
        database : 'a19100222'
        })
    return connection;
}

function selectQuery(connection)
{
    connection.connect();
    return new Promise(function(resolve,reject)
    {
        connection.query('SELECT * FROM videojuego', function(error, results) 
        {
            if(results == undefined)
            {
                reject(new Error("Error"))
            } 
            else 
            {
                resolve(results)
            }
        })
    });
}

function selectWhere(connection, ID){
    connection.connect();
    return new Promise(function(resolve,reject){
        connection.query(`SELECT * FROM videojuego where ID = ${ID}`, function(error, results) {
            if(results == undefined)
            {
                reject(new Error("Error"))
            } 
            else 
            {
                resolve(results)
            }
        })
    });
}

function createQuery(connection, videojuego)
{
    connection.connect();
    return new Promise(function(resolve,reject)
    {
        query = `INSERT INTO videojuego(inputTituloVideojuego, Genero, inputPrecio, Fecha) 
        VALUES ("${videojuego.inputTituloVideojuego}","${videojuego.Genero}","${videojuego.inputPrecio}","${videojuego.Fecha}")`
        connection.query(query, function(error, rows) 
        {
            if(error)
            {
                reject(new Error("No insertado"))
            } 
            else 
            {
                resolve("Se agrego campo con ID: "+rows.insertId)
            }
        });
    });
}

function modifyQuery(connection, videojuego)
{
    connection.connect();
    return new Promise(function(resolve,reject)
    {
        query = `UPDATE videojuego SET inputTituloVideojuego=?, Genero=?, inputPrecio=?, Fecha=? WHERE ID = ?`
        connection.query(query,[videojuego.inputTituloVideojuego,videojuego.Genero,videojuego.inputPrecio,videojuego.Fecha,videojuego.id],function(error, results) 
        {
            if(error)
            {
                reject(new Error(error))
            } 
            else 
            {
                resolve("Se modifico: "+ results.affectedRows)
            }
        })
    });
}

function deleteQuery(connection, ID)
{
    connection.connect();
    return new Promise(function(resolve,reject)
    {
    connection.query(`DELETE FROM videojuego WHERE ID=?`,[ID], function(error, results, fields) 
    {
        if(error)
        {
            reject(new Error("No eliminado"))
        } 
        else 
        {
            resolve("Se elimino: "+ results.affectedRows)
        }
    })
});
}

exports.getConnection = getConnection;
exports.selectQuery = selectQuery;
exports.selectWhere = selectWhere;
exports.createQuery = createQuery;
exports.deleteQuery = deleteQuery;
exports.modifyQuery = modifyQuery;