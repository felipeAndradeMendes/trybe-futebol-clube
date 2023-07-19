import UserModel from '../database/models/UserModel';
import { IUser, IUserModel } from '../Interfaces/User';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async getUserByEmail(email: string): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    return { status: 'SUCCESSFUL', data: user };
  }
}
