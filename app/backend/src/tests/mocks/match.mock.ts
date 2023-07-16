const macthes = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: 'Internacional'
    }
  }
]

const updateSuccessResponse = 1;
const updateErrorResponse = 0;

const updateBodyMatchResponse = {
  "awayTeamGoals": 1,
  "homeTeamGoals": 3
}

const errorMsgUpdateMatch = { 
  message: `A partida com id 1 não pode ser atualizada 
          ou os dados passados são iguais aos anteriores` 
};

const createMatchModelResponse = {
  id: 49,
  homeTeamId: 1,
  homeTeamGoals: 12,
  awayTeamId: 2,
  awayTeamGoals: 9,
  inProgress: true
}

const createMatchBodyRequest = {
  homeTeamId: 1, 
  awayTeamId: 2, 
  homeTeamGoals: 12,
  awayTeamGoals: 9
}

// const homeMatchFoundById = {
//   id: 49,
//   homeTeamId: 1,
//   homeTeamGoals: 12,
//   awayTeamId: 2,
//   awayTeamGoals: 9,
//   inProgress: true
// }

// const awayMatchFoundById = {
//   id: 9,
//   homeTeamId: 1,
//   homeTeamGoals: 12,
//   awayTeamId: 2,
//   awayTeamGoals: 9,
//   inProgress: true
// }

export {
  macthes,
  updateErrorResponse,
  updateSuccessResponse,
  updateBodyMatchResponse,
  errorMsgUpdateMatch,
  createMatchModelResponse,
  createMatchBodyRequest,
};