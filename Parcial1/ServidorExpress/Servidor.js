const express = require('express');
const cors = require('cors');

const app = express()
app.use(cors({origin:"http://localhost"}))
app.use(express.text())
app.use(express.json())

app.use((req,res,next) =>{
    console.log("Primera funcion middiware")
    next()
},(req,res,next) =>{
    console.log("Segunda funcion middiware")
    next()
});

app.get('/',(req,res) => {
    //res.send('Servidor Express funcionando')
    res.sendFile('./static/404.html',{root:__dirname},(err)=>(console.log('Arcivo enviado')))
});

app.post('/texto',(req,res)=>{
    console.log(req.body)
    let may = req.body.toUpperCase()
    let sinesp = req.body.trim()
    let longl = req.body.length
    res.json({maysuculas: may,
            sinespacios : sinesp,
            longitud : longl})
});

app.post('/json',(req,res)=>{
    console.log(req.body.nombre)
    let cadena = "Hola " + req.body.nombre+" "+req.body.apellido+" como estas"
    res.json({saludo:cadena})
});

app.get('/mayusuculas/:cadena', (req, res) =>{
    console.log(req.params)
    res.send(req.params)
});

app.get('/suma', (req, res) =>{
    console.log(req.query);
    let suma = parseInt(req.query.x)+parseInt(req.query.y);
    res.send(`la suma es de: ${suma}`)
});

app.use((req,res)=>{
    res.status(404).sendFile('./static/404.html',{root:__dirname})
});

app.listen(8082,()=>{
    console.log('Server express 8082 escuchando correctamente')
    console.log(__dirname)
    console.log(__filename)
});
