import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.matchService.getAllMatches();
    return res.status(200).json(serviceResponse.data);
  }

  public async getAllInProgress(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.matchService.getAllInProgress();

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }
}
