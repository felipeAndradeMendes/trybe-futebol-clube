import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import SequelizeUser from '../database/models/SequelizeUser';
import {
  user,
  validLoginBody,
  noEmailLoginBody,
  noPasswordLoginBody,
  invalidEmailFormatLoginBody,
  invalidPasswordFormatLoginBody,
  genericToken,
} from './mocks/login.mock';

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

  it('Retorna erro caso email nao seja preenchido', async function () {
    const { status, body } = await chai.request(app).post('/login').send(noEmailLoginBody);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled'});
  });

  it('Retorna erro caso password nao seja preenchido', async function () {
    const { status, body } = await chai.request(app).post('/login').send(noPasswordLoginBody);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled'});
  });

  it('Retorna erro caso o formato do email esteja incorreto', async function () {
    const { status, body } = await chai.request(app).post('/login').send(invalidEmailFormatLoginBody);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password'});
  });

  it('Retorna erro caso o password tenha tenha menos de 7 caracteres', async function () {
    const { status, body } = await chai.request(app).post('/login').send(invalidPasswordFormatLoginBody);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password'});
  });

  it('Retorna erro quando o email não está cadastrado no banco de dados', async function () {
    // const mockFindOneReturn = SequelizeUser.build(user);

    sinon.stub(SequelizeUser, 'findOne').resolves(null);
    sinon.stub(bcrypt, 'compare').returns(true as any);

    const { status, body } = await chai.request(app).post('/login').send(validLoginBody);
    
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Retorna erro quando a senha digitada está incorreta de acordo com o bd', async function () {
    const mockFindOneReturn = SequelizeUser.build(user);

    sinon.stub(SequelizeUser, 'findOne').resolves(mockFindOneReturn);
    sinon.stub(bcrypt, 'compare').returns(false as any);

    const { status, body } = await chai.request(app).post('/login').send(validLoginBody);
    
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Retorna erro quando token não é passado na requisição da rota', async function () {
      const tokenError = { message: 'Token not found' };
      sinon.stub(jwt, 'sign').throws(tokenError);

    const { status, body } = await chai
    .request(app)
    .get('/login/role')
    
    expect(status).to.equal(401);
    expect(body).to.deep.equal(tokenError);
  });

  it('Retorna erro quando o token é invalido', async function () {
    const tokenError = { message: 'Token must be a valid token' };
    sinon.stub(jwt, 'sign').throws(tokenError);

    const { status, body } = await chai
    .request(app)
    .get('/login/role')
    .set('Authorization', 'invalid_token')
    
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('Retorna role com sucesso ao validar o token', async function () {
    const tokenMessage = { message: 'Token must be a valid token' };
    sinon.stub(jwt, 'sign').returns(user as any);

    const { status, body } = await chai
    .request(app)
    .get('/login/role')
    .set('Authorization', genericToken)
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal({ role: 'user'});
  });
  
});


