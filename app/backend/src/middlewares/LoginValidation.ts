import { Request, Response, NextFunction } from 'express';

export default class LoginValidation {
  static validateEmail(req: Request, res: Response, next: NextFunction): Response | void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!emailRegex.test(email)) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validatePassword(req: Request, res: Response, next: NextFunction): Response | void {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (password.length <= 6) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    next();
  }
}
