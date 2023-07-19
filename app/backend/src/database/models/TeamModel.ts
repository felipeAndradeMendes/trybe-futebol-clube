import SequelizeTeam from './SequelizeTeam';
import { ITeam, ITeamModel } from '../../Interfaces/Team';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
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
