import SequelizeMatch from './SequelizeMatch';
import { IMatch, IMatchModel } from '../../Interfaces/Match';
import SequelizeTeam from './SequelizeTeam';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll(
      {
        include: [
          {
            model: SequelizeTeam,
            as: 'homeTeam',
            attributes: { exclude: ['id'] },
          },
          {
            model: SequelizeTeam,
            as: 'awayTeam',
            attributes: { exclude: ['id'] },
          },
        ],
      },
    );
    return dbData;
  }
}
