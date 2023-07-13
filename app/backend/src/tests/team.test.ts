import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('TESTES ROTAS TEAM', () => {
  function afterEach() {
    sinon.restore();
  }
  it('A rota get /teams retorna um array de times', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });
});
