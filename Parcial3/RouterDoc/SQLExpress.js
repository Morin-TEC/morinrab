const express = require('express');
const cors = require('cors');
const ruta_videojuego = require('./rutas/ruta_videojuego');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express()

const swaggerOptions = {
  definition: {
  openapi: '3.0.0',
  info: {
  title: 'API Videojuegos',
  version: '1.0.0',
  },
  servers:[
  {url: "http://localhost:8082"}
  ],
  },
  apis: [`${path.join(__dirname,"./rutas/ruta_videojuego.js")}`],
  };


app.use(cors({origin:"http://localhost"}))
app.use(express.text())
app.use(express.json())
app.use('/videojuego',ruta_videojuego.router)

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(swaggerDocs));

app.listen(8082,()=>{
  console.log('Server express 8082 escuchando correctamente')
});