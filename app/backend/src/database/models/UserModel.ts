import SequelizeUser from './SequelizeUser';
import { IUser, IUserModel } from '../../Interfaces/User';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  public async findByEmail(email: string): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });

    if (!dbData) {
      return null;
    }
    return dbData.dataValues;
  }
}
