// import { NewEntity } from '../Interfaces/index';
import TeamModel from '../database/models/TeamModel';
import { ITeam, ITeamModel } from '../Interfaces/Team';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);

    if (!team) {
      return { status: 'NOT_FOUND', data: { message: `Não foi encontrado o time com id ${id}` } };
    }

    return { status: 'SUCCESSFUL', data: team };
  }
}
