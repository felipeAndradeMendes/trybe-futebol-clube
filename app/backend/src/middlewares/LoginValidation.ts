import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../Interfaces/Login';
import JwtToken from '../utils/JwtToken';

export default class LoginValidation {
  protected static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  protected static passwordMinLength = 7;
  private static jwtUtils = new JwtToken();

  static validateEmail(req: Request, res: Response, next: NextFunction): Response | void {
    const { email } = req.body as ILogin;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!LoginValidation.emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validatePassword(req: Request, res: Response, next: NextFunction): Response | void {
    const { password } = req.body as ILogin;

    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (password.length < LoginValidation.passwordMinLength) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateJWT(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const tokenData = authorization.split(' ');
    try {
      const validation = LoginValidation.jwtUtils.verify(tokenData[1]);
      res.locals.user = validation;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
