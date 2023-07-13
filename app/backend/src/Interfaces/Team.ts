export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamModel {
  // create(data: Partial<ITeam>): Promise<ITeam>,
  findAll(): Promise<ITeam[]>,
}
