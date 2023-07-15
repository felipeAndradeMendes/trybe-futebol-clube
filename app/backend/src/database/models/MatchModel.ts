import SequelizeMatch from './SequelizeMatch';
import { IMatch, IMatchModel } from '../../Interfaces/Match';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }
}
