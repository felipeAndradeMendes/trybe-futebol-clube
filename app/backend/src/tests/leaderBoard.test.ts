import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { allMatches, teams, homeResults, awayResults, allResults } from './mocks/leaderboard.mock'
import SequelizeTeam from '../database/models/SequelizeTeam';
import LeaderBoardService from '../services/LeaderBoardService';
import LeaderBoardBuild from '../utils/LeaderBoardBuild';
import { IMatchModel} from '../Interfaces/Match';
import { ITeamModel } from '../Interfaces/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('ROTAS LEADERBOARD', () => {
  let leaderBoardService: LeaderBoardService;
  let matchModelMock: IMatchModel;
  let teamModelMock: ITeamModel;
  beforeEach(function () {
    sinon.restore();
    matchModelMock = {} as IMatchModel;
    teamModelMock = {} as ITeamModel;
    leaderBoardService = new LeaderBoardService(matchModelMock, teamModelMock);
  
  })

  it('Rota leaderboard/home retorna com sucesso', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);
    sinon.restore()
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const { status, body } = await chai
    .request(app)
    .get('/leaderboard/home');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(homeResults);
  });

  it('Rota leaderboard/away retorna com sucesso', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);
    sinon.restore()
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const { status, body } = await chai
    .request(app)
    .get('/leaderboard/away');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(awayResults);
  });

  it('Rota leaderboard/ retorna com sucesso', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);
    sinon.restore()
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    leaderBoardService = new LeaderBoardService()
    
    const calculateAllSpy = sinon.spy(LeaderBoardBuild.prototype, 'calculateAll');
    const result = await leaderBoardService.showLeaderBoard('home', 'all');

    const { status, body } = await chai
    .request(app)
    .get('/leaderboard');

    // expect(calculateAllSpy.calledOnce).to.be.true;
    expect(status).to.equal(200);
    expect(body).to.deep.equal(allResults);
  });
});

// ESPERAR ACABAR A IMPLEMENTAÇÃO DA ROTA /AWAY PRA FAZER OS TESTES