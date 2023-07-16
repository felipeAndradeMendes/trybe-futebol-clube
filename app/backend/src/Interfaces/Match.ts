export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchModel {
  findAll(matchProgress?: string): Promise<IMatch[]>;
  finishMatch(id: number): Promise<number | null>;
}
