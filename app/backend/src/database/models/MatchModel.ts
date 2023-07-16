import SequelizeMatch from './SequelizeMatch';
import { IMatch, IMatchModel } from '../../Interfaces/Match';
import SequelizeTeam from './SequelizeTeam';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  // Implementar alternativa que já traga do bd os resultados buscados;
  static filterMatchesByProgress(matches: IMatch[], progress: string) {
    const filterMatches = matches.filter((match) => (
      match.inProgress.toString() === progress));

    return filterMatches;
  }

  async findAll(matchProgress?: string): Promise<IMatch[]> {
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
    if (matchProgress) { return MatchModel.filterMatchesByProgress(dbData, matchProgress); }

    return dbData;
  }

  // async findAllInProgress(): Promise<IMatch[]> {
  //   const dbData = await this.model.findAll(
  //     {
  //       where: { inProgress: true },
  //     },
  //   );
  //   return dbData;
  // }

  async finishMatch(id: number): Promise<number | null> {
    const [dbData] = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );

    if (dbData === 0) {
      return null;
    }
    console.log('DB DATA: ', dbData);

    return dbData;
  }
}
