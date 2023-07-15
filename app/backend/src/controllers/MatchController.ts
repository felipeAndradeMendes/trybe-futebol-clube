import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.matchService.getAllMatches();
    return res.status(200).json(serviceResponse);
  }
}
