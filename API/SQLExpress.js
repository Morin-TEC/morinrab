const express = require('express');
const cors = require('cors');
const route_pokemon = require('./route_pokemon');
const app = express();

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Pokemon',
            desciption: 'API CRUD de Pokemon',
            version: '1.0.0',
            },
        servers:[
            {url: "http://localhost:8082"}
        ], 
        components: {
            schemas: {
                Pokemon: {
                type: "object",
                properties: {
                    Nombre: {
                    type: "string"
                    },
                    Tipo: {
                    type: "string"
                    },
                    Habilidad: {
                    type: "string"
                    },
                    Generacion: {
                    type: "string"
                    }
                },
                required: ["Nombre", "Tipo", "Habilidad","Generacion"]
                }
            }
        },
    },
    apis: [`${path.join(__dirname,"./route_pokemon.js")}`],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));
app.use(express.text());
app.use(express.json());

app.use(cors({origin:"http://localhost"}))
app.use('/pokemon',route_pokemon.router)

app.listen(8082, () => {
    console.log('Servidor express escuchando en puerto 8082');
});

app.use('/', (req,res) => {
    res.status(404).sendFile('./static/404.html',{root:__dirname})
 });