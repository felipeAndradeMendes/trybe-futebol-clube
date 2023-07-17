import { ITeamModel } from '../Interfaces/Team';
import { IMatchModel } from '../Interfaces/Match';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import LeaderBoardBuild from '../utils/LeaderBoardBuild';
import { ILeaderBoardResponse } from '../Interfaces/LeaderBoard';

export default class LeaderBoardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async showLeaderBoard(): Promise<ILeaderBoardResponse[]> {
    const matches = await this.matchModel.findAll('false');
    const teams = await this.teamModel.findAll();

    const result = LeaderBoardBuild.buildHomeBoard(matches, teams);
    return result;
  }
}
