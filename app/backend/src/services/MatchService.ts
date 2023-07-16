import MatchModel from '../database/models/MatchModel';
import { IMatch, IMatchModel } from '../Interfaces/Match';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async getAllMatches(matchProgress?: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll(matchProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
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
}
