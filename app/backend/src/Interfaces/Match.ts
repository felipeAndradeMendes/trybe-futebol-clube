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
  updateMatch(id: number, updatedGoals: IMatchUpdateBody): Promise<number | null>;
  create(newMatch: IMatchCreateBody): Promise<IMatch | null>;
  findById(id: number): Promise<IMatch | null>;
}

export interface IMatchUpdateBody {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatchCreateBody {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}
