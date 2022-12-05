const mysql = require('mysql');

function getConnection(){
    var connection = mysql.createConnection(
        {
        host     : '127.0.0.1',
        user     : 'root',
        port     : '3306',
        database : 'pokemon'
        })
    return connection;
}

function selectQuery(connection)
{
    connection.connect();
    return new Promise(function(resolve,reject)
    {
        connection.query('SELECT * FROM pokemon', function(error, results) 
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
        connection.query(`SELECT * FROM pokemon where ID = ${ID}`, function(error, results) {
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

function createQuery(connection, pokemon)
{
    connection.connect();
    return new Promise(function(resolve,reject)
    {
        query = `INSERT INTO pokemon(Nombre, Tipo, Habilidad, Generacion) 
        VALUES ("${pokemon.Nombre}","${pokemon.Tipo}","${pokemon.Habilidad}","${pokemon.Generacion}")`
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

function modifyQuery(connection, pokemon)
{
    connection.connect();
    return new Promise(function(resolve,reject)
    {
        query = `UPDATE pokemon SET Nombre=?, Tipo=?, Habilidad=?, Generacion=? WHERE ID = ?`
        connection.query(query,[pokemon.Nombre,pokemon.Tipo,pokemon.Habilidad,pokemon.Generacion,pokemon.id],function(error, results) 
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
    connection.query(`DELETE FROM pokemon WHERE ID=?`,[ID], function(error, results, fields) 
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