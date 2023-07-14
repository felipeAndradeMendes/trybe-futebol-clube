import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/Login';

export default class JwtToken {
  private secret = process.env.JWT_SECRET || 'jwt_secret';

  protected sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret);
  }

  // protected verify()
}
