import * as bcrypt from 'bcryptjs';
// import { BcryptCompare } from '../types/Login'

export default class BcryptUtils {
  static async compare(password: string, hash: string): Promise<boolean> {
    const checkPassword = await bcrypt.compare(password, hash);
    return checkPassword;
  }
}
