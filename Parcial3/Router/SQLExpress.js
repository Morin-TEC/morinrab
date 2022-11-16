const express = require('express');
const cors = require('cors');
const ruta_videojuego = require('./ruta_videojuego')

const app = express()
app.use(cors({origin:"http://localhost"}))
app.use(express.text())
app.use(express.json())


app.use('/videojuego',ruta_videojuego.router)

app.listen(8082,()=>{
  console.log('Server express 8082 escuchando correctamente')
});