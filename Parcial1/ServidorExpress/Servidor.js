const express = require('express');
const cors = require('cors');

const app = express()
app.use(cors({origin:"http://localhost"}))

app.get('/',(req,res) => {
    //res.send('Servidor Express funcionando')
    res.sendFile('./static/404.html',{root:__dirname})
});
app.post('/',(req,res)=>{
    res.json({usuario:'carlos'})
});
app.use((req,res)=>{
    res.status(404).sendFile('./static/404.html',{root:__dirname})
})
app.listen(8082,()=>{
    console.log('Server express 8082 escuchando correctamente')
    console.log(__dirname)
    console.log(__filename)
});
