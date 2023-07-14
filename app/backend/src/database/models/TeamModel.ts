import SequelizeTeam from './SequelizeTeam';
import { ITeam, ITeamModel } from '../../Interfaces/Team';
// import { NewEntity } from '../../Interfaces/index';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    // console.log(dbData);
    return dbData;
  }

  async findById(id: number): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);

    if (!dbData) {
      return null;
    }
    return dbData;
  }
}
