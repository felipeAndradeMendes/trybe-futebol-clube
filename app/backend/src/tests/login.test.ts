import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as bcrypt from 'bcryptjs';
import SequelizeUser from '../database/models/SequelizeUser';
import { user, validLoginBody } from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('TESTES ROTA LOGIN', () => {
  
  beforeEach(function () {
    sinon.restore();
  })
  
  it('O login é feito com sucesso', async function () {
    const mockFindOneReturn = SequelizeUser.build(user);
    sinon.stub(SequelizeUser, 'findOne').resolves(mockFindOneReturn);
    sinon.stub(bcrypt, 'compare').returns(true as any);
    const { status, body } = await chai.request(app).post('/login').send(validLoginBody);
    
    expect(status).to.equal(200);
    expect(body).to.have.key('token');
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
