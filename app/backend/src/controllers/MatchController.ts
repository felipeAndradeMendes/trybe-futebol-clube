import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    const serviceResponse = await this.matchService.getAllMatches(inProgress as string);
    return res.status(200).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const serviceResponse = await this.matchService.finishMatch(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updatedGoals = req.body;
    const { homeTeamGoals, awayTeamGoals } = updatedGoals;

    const serviceResponse = await this.matchService.updateMatch(Number(id), updatedGoals);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(mapStatusHTTP(serviceResponse.status)).json({ awayTeamGoals, homeTeamGoals });
  }
}
