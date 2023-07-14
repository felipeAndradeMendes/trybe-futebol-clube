import { Request, Response } from 'express';
import UserService from '../services/UserService';
import JwtToken from '../utils/JwtToken';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginController {
  constructor(
    private userService = new UserService(),
  ) {}

  private jwtToken = new JwtToken();

  public async login(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const serviceResponse = await this.userService.getUserByEmail(email);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    // const token = this.jwtToken(pa)
    return res.status(200).json({ message: 'success' });
  }
}
