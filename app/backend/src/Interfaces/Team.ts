export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamModel {
  findAll(): Promise<ITeam[]>,
  findById(id: number): Promise<ITeam | null>,
}
