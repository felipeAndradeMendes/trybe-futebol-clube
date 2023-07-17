export interface ILeaderBoardResponse {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number
}

// export interface ILocal {
//   local: 'home' | 'away';
// }

export type Local = 'home' | 'away';
