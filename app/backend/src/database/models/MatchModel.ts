import SequelizeMatch from './SequelizeMatch';
import { IMatch, IMatchCreateBody, IMatchModel, IMatchUpdateBody } from '../../Interfaces/Match';
import SequelizeTeam from './SequelizeTeam';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  // Implementar alternativa que já traga do bd os resultados buscados;
  static filterMatchesByProgress(matches: IMatch[], progress: string) {
    const filterMatches = matches.filter((match) => (
      match.inProgress.toString() === progress));

    return filterMatches;
  }

  static isTeamsDifferent(homeTeamId: number, awayTeamId: number): boolean {
    return homeTeamId !== awayTeamId;
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

  async finishMatch(id: number): Promise<number | null> {
    // console.log('CHAMA FINISHED MODEL');

    const [dbData] = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );

    // console.log('DB DATA MODELFINISHED:', dbData);

    if (dbData === 0) {
      return null;
    }

    return dbData;
  }

  async updateMatch(id: number, updatedGoals: IMatchUpdateBody): Promise<number | null> {
    const { homeTeamGoals, awayTeamGoals } = updatedGoals;
    const [dbData] = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    if (!dbData) {
      return null;
    }

    return dbData;
  }

  async create(newMatch: IMatchCreateBody): Promise<IMatch> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = newMatch;

    const dbData = await this.model.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });
    // console.log('DATAVALUES:', dbData.dataValues);

    return dbData;
  }

  // async findById(id: number): Promise<IMatch | null> {
  //   const dbData = await this.model.findByPk(id);

  //   console.log('TESTA TEAM ID PRA VER SE EXISTE:', dbData);

  //   if (!dbData) {
  //     return null;
  //   }

  //   return dbData;
  // }
}
