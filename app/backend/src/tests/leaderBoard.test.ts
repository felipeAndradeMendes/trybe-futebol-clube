import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('ROTAS LEADERBOARD', () => {
  describe('Rota /leaderboard/home', function () {
    it('')
  });
});

// ESPERAR ACABAR A IMPLEMENTAÇÃO DA ROTA /AWAY PRA FAZER OS TESTES