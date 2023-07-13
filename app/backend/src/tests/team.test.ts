import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams, team } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('TESTES ROTAS TEAM', () => {
  
  beforeEach(function () {
    sinon.restore();
  })
  
  it('A rota get /teams retorna um array de times', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/teams');
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });  
 

  it('A rota /team/1 deve resgatar o time correto com sucesso', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);
    const { status, body } = await chai.request(app).get('/teams/1');
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });
 

  // AINDA DANDO ERRO, CREIO QUE POR CAUSA DO SINO RESTORE OU FALTA DELE
  it('Deve retornar erro se o id do time buscado não existir no db', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    const { status, body } = await chai.request(app).get('/teams/999');

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: `Não foi encontrado o time com id 999` })
  });
  
});

// describe('ERROS ', function () {
//   it('Deve retornar erro se o id do time buscado não existir no db', async function () {
//     sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
//     const { status, body } = await chai.request(app).get('/teams/999');

//     expect(status).to.equal(404);
//     expect(body).to.deep.equal({ message: `Não foi encontrado o time com id 999` })
//   });
// });
