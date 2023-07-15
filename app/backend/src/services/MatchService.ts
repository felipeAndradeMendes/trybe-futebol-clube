import MatchModel from '../database/models/MatchModel';
import { IMatch, IMatchModel } from '../Interfaces/Match';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async getAllMatches(matchProgress?: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll(matchProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  // public async getAllInProgress(): Promise<ServiceResponse<IMatch[]>> {
  //   const allInProgress = await this.matchModel.findAllInProgress();

  //   if (allInProgress.length === 0) {
  //     return { status: 'NOT_FOUND', data: { message: 'There are no matches in progress' } };
  //   }

  //   return { status: 'SUCCESSFUL', data: allInProgress };
  // }
}
