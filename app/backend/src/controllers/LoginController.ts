import { Request, Response } from 'express';

export default class LoginController {
  public async login(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'success' });
  }
}
