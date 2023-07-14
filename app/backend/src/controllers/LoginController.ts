import { Request, Response } from 'express';
import UserService from '../services/UserService';
import JwtToken from '../utils/JwtToken';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import BcryptUtils from '../utils/BcryptUtils';

export default class LoginController {
  constructor(
    private userService = new UserService(),
  ) {}

  private jwtToken = new JwtToken();

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const serviceResponse = await this.userService.getUserByEmail(email);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    const verifyPassword = await BcryptUtils.compare(password, serviceResponse.data.password);
    // console.log('VERIFY PASSWORD:', verifyPassword);
    if (!verifyPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // console.log(serviceResponse);
    const token = this.jwtToken.sign(serviceResponse.data);
    return res.status(200).json({ token });
  }

  public static getRole(req: Request, res: Response): Response {
    const { user } = res.locals;
    // private userRole: string = res.locals.role

    return res.status(200).json({ role: user.role });
    // console.log('USER: ', user);
  }
}
