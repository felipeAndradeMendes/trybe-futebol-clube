import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/Login';

export default class JwtToken {
  private secret = process.env.JWT_SECRET || 'jwt_secret';

  public sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret);
  }

  public verify(token: string): JwtPayload | string {
    return jwt.verify(token, this.secret) as JwtPayload;
  }
}
