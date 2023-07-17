import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { user, genericToken } from './mocks/login.mock'
import { macthes,
  updateErrorResponse, 
  updateSuccessResponse,
  updateBodyMatchResponse,
  errorMsgUpdateMatch,
  createMatchModelResponse,
  createMatchBodyRequest,
  // matchFoundById,
} from './mocks/match.mock';

import * as jwt from 'jsonwebtoken';
import MatchService from '../services/MatchService';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('TESTES ROTAS /MATCHES', () => {
  describe('Rota /matches/id/finish', function () {

    beforeEach(function () {
      sinon.restore();
    })
  
    it('Retorna todas as partidas com sucesso', async function () {
      sinon.stub(SequelizeMatch, 'findAll').resolves(macthes as any);
      const { status, body } = await chai
      .request(app)
      .get('/matches');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(macthes);
    })
  
    it('Atualiza progresso da partida para finalizada com sucesso', async function () {
      sinon.stub(jwt, 'sign').returns(user as any);
      // const mockUpdateReturn = SequelizeMatch.build("updateSuccessResponse" as any)
      sinon.stub(SequelizeMatch, 'update').resolves([updateSuccessResponse] as any);
  
      const { status, body } = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', genericToken);
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal({ message: 'Finished'});
    });
  
    it('Retorna erro se partida não for encerrada ou se ja estiver encerrada', async function () {
      sinon.stub(jwt, 'sign').returns(user as any);
      // const mockUpdateReturn = SequelizeMatch.build(null as any)
      sinon.stub(SequelizeMatch, 'update').resolves([updateErrorResponse] as any);
  
      const { status, body } = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', genericToken);
  
      expect(status).to.equal(409);
      expect(body).to.deep.equal({ message: 'A partida com id 1 não pode ser encerrada ou já está encerrada'});
    });
  });

  describe('Rota update matches/id', function () {
    beforeEach(function () {
      sinon.restore();
    })

    it('Atualiza com sucesso gols da partida em andamento', async function () {
      sinon.stub(SequelizeMatch, 'update').resolves([updateSuccessResponse]);
      const { status, body } = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', genericToken)
      .send(updateBodyMatchResponse);

      expect(status).to.equal(200);
      expect(body).to.deep.equal(updateBodyMatchResponse);
    });

    it('Retorna erro quando os dados de atualização são os mesmo do db', async function () {
      sinon.stub(SequelizeMatch, 'update').resolves([updateErrorResponse]);
      const { status, body } = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', genericToken)
      .send(updateBodyMatchResponse);

      expect(status).to.equal(409);
      expect(body).to.deep.equal(errorMsgUpdateMatch);
    });

    it('Retorna erro quando token não é passado na requisição da rota', async function () {
      const tokenError = { message: 'Token not found' };
      sinon.stub(jwt, 'sign').throws(tokenError);

      const { status, body } = await chai
      .request(app)
      .patch('/matches/1')
      .send(updateBodyMatchResponse);

      expect(status).to.equal(401);
      expect(body).to.deep.equal(tokenError);
    });

    it('Retorna erro quando o token é invalido', async function () {
      const tokenError = { message: 'Token must be a valid token' };
      sinon.stub(jwt, 'sign').throws(tokenError);

      const { status, body } = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', 'invalid_token')
      .send(updateBodyMatchResponse);

      expect(status).to.equal(401);
      expect(body).to.deep.equal(tokenError);
    });
  });  

  describe('Rota create Match', function () {
    beforeEach(function () {
      sinon.restore();
    })

    it('Cria partida e retorna dados com sucesso', async function () {
      sinon.stub(SequelizeMatch, 'create').resolves(createMatchModelResponse as any);
      const { status, body } = await chai
      .request(app)
      .post('/matches')
      .send(createMatchBodyRequest)
      .set('Authorization', genericToken);

      expect(status).to.equal(201);
      expect(body).to.deep.equal(createMatchModelResponse);
    });

    // it('Retorna erro quando um dos times nao existe no bd', async function () {
    //   sinon.stub(SequelizeMatch, 'findByPk').resolves(matchFoundById)
    //   const { status, body } = await chai
    //   .request(app)
    //   .post('/matches')
    //   .send(createMatchBodyRequest)
    //   .set('Authorization', genericToken);

    //   expect(status).to.equal(201);
    //   expect(body).to.deep.equal(createMatchModelResponse);
    // });

    // Falta testar os erros de quando o time nao existe e de quando passa times iguais na requisição
  });
});
