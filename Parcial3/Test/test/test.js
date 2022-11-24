let   chai     = require('chai');
let   chaiHttp = require('chai-http');
const expect   = require('chai').expect;
chai.use(chaiHttp);

const url= 'http://localhost:8082';

describe('Inserta un videojuego: ',()=>{
    it('deberia insertar un videojuego', (done) => {
        chai.request(url)                                                   
            .post('/agregar')                       
            .send({inputTituloVideojuego:"Mortal Kombat 12", Genero:"Peleas", inputPrecio:"999", Fecha:"10 de Diciembre 2023"})                       
            .end( function(err,res){
                expect(res).to.have.status(200);
            //    expect(res.text).to.be.a('string');
                done();
            });      
    });
}); 
    describe('Obtiene videojuegos: ',()=>{
        it('Deberia obtener todos los videojuegos', (done) => {
            chai.request(url)
                .get('/')
                .send()
                .end( function(err,res){
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        done();
                });     
        });
})