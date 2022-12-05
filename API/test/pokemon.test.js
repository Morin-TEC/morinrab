let   chai     = require('chai');
let   chaiHttp = require('chai-http');
const router = require ('../route_pokemon');
const expect   = require('chai').expect;
chai.use(chaiHttp);

const url= 'http://localhost:8082';

describe('Obtiene Pokemon: ',()=>{
    it('Deberia obtener todos los Pokémon', (done) => {
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

describe('Inserta un Pokemon: ',()=>{
    it('deberia insertar un Pokémon', (done) => {
        chai.request(url)                                                   
            .post('/agregar')                       
            .send({Nombre:"Pichu", Tipo:"Electrico", Habilidad:"Trueno", Generacion:"Segunda"})                       
            .end( function(err,res){
                expect(res).to.have.status(200);
            //    expect(res.text).to.be.a('string');
                done();
            });      
    });
}); 

describe('Busca un Pokemon con su ID', () => {
    it('Deberia de obtener un Pokemon', (done) => {
      chai.request(url)
        .get(`/pokemon/${id}`)
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.be.an('array');
          chai.expect(res.body[0]).to.have.property('ID');
          chai.expect(res.body[0]).to.have.property('Nombre');
          chai.expect(res.body[0]).to.have.property('Tipo');
          chai.expect(res.body[0]).to.have.property('Habilidad');
          chai.expect(res.body[0]).to.have.property('Generacion');
          done();
        });
    });
});

describe('Actualiza un Pokemon', () => {
    it('Actuliza un dato del Pokémon seleccionado', (done) => {
    chai
        .request(url)
        .patch(`/pokemon/${id}`)
        .send({
        Nombre: 'Magnemite',
        })
        .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('ID');
        done();
        });
    });
});

describe('Borra un Pokemon', () => {
    it('Borra un Pokemon segun su ID', (done) => {
    chai
        .request(url)
        .delete(`/pokemon/${id}`)
        .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('ID');
        done();
        });
    });
});