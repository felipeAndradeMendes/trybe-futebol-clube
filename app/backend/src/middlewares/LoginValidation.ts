import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../Interfaces/Login';

export default class LoginValidation {
  protected static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  protected static passwordMinLength = 7;

  static validateEmail(req: Request, res: Response, next: NextFunction): Response | void {
    const { email } = req.body as ILogin;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!LoginValidation.emailRegex.test(email)) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validatePassword(req: Request, res: Response, next: NextFunction): Response | void {
    const { password } = req.body as ILogin;

    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (password.length < LoginValidation.passwordMinLength) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    next();
  }
}
