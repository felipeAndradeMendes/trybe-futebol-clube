import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) {}

  public async getHomeLeaderBoard(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderBoardService.showLeaderBoard();
    return res.status(200).json(serviceResponse);
  }
}
