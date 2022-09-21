
const http = require('http');
const servidor=http.createServer((req,res)=> {
	res.end('Servidor HTTP de Morin respondiendo');
});

servidor.listen(8080, ()=>{console.log('Servidor corriendo')});

