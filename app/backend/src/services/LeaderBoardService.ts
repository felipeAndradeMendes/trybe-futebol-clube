import { ITeamModel } from '../Interfaces/Team';
import { IMatchModel } from '../Interfaces/Match';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { ILeaderBoardResponse, Local } from '../Interfaces/LeaderBoard';
import LeaderBoardBuild from '../utils/LeaderBoardBuild';
// import LeaderBoardBuildAll from '../utils/LeaderBoardAllBuild';

export default class LeaderBoardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async showLeaderBoard(local: Local, isAll?: string): Promise<ILeaderBoardResponse[]> {
    const matches = await this.matchModel.findAll('false');
    const teams = await this.teamModel.findAll();
    const leaderBoardBuild = new LeaderBoardBuild(local, matches, teams);
    if (isAll === 'all') {
      const result = leaderBoardBuild.calculateAll();
      return result;
    }

    // const result = LeaderBoardBuild.buildHomeBoard(local, matches, teams);
    const result = leaderBoardBuild.buildLocalBoard();

    return result;
  }

  // public async showAllLeaderBoard(): Promise<ILeaderBoardResponse[]> {
  //   const matches = await this.matchModel.findAll('false');
  //   const teams = await this.teamModel.findAll();

  //   const leaderBoardBuildAll = new LeaderBoardBuildAll('home', matches, teams);
  //   const result = leaderBoardBuildAll.calculateAll();

  //   return result;
  // }
}
