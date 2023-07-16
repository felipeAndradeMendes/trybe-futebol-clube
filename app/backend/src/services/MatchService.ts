import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { IMatch, IMatchCreateBody, IMatchModel, IMatchUpdateBody } from '../Interfaces/Match';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamModel } from '../Interfaces/Team';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  // private async teamsExists(homeTeamId: number, awayTeamId: number): Promise<boolean> {
  //   const isHomeTeam = await this.matchModel.findById(homeTeamId);
  //   const isAwayTeam = await this.matchModel.findById(awayTeamId);

  //   if (isHomeTeam === null || isAwayTeam === null) {
  //     return false;
  //   }

  //   return true;
  // }

  private async teamsExists(homeTeamId: number, awayTeamId: number): Promise<boolean> {
    const isHomeTeam = await this.teamModel.findById(homeTeamId);
    const isAwayTeam = await this.teamModel.findById(awayTeamId);

    if (isHomeTeam === null || isAwayTeam === null) {
      return false;
    }

    return true;
  }

  public async getAllMatches(matchProgress?: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll(matchProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    // console.log('CHAMA FINISHED SERVICE');
    const modelResponse = await this.matchModel.finishMatch(id);

    if (!modelResponse) {
      return {
        status: 'CONFLICT',
        data: { message: `A partida com id ${id} não pode ser encerrada ou já está encerrada` } };
    }

    return {
      status: 'SUCCESSFUL',
      data: { message: 'Finished' },
    };
  }

  public async updateMatch(id: number, updatedGoals: IMatchUpdateBody):
  Promise<ServiceResponse<ServiceMessage | string>> {
    const modelResponse = await this.matchModel.updateMatch(id, updatedGoals);

    if (!modelResponse) {
      return {
        status: 'CONFLICT',
        data: { message: `A partida com id ${id} não pode ser atualizada 
          ou os dados passados são iguais aos anteriores` } };
    }

    return {
      status: 'SUCCESSFUL',
      data: 'ok',
    };
  }

  public async createMatch(newMacth: IMatchCreateBody): Promise<ServiceResponse<IMatch | null>> {
    const { homeTeamId, awayTeamId } = newMacth;
    const validateTeamsExistence = await this.teamsExists(homeTeamId, awayTeamId);
    const validateTeamsDifferent = MatchModel.isTeamsDifferent(homeTeamId, awayTeamId);

    if (!validateTeamsDifferent) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    if (!validateTeamsExistence) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const matchCreated = await this.matchModel.create(newMacth);
    return {
      status: 'SUCCESSFUL',
      data: matchCreated,
    };
  }
}
