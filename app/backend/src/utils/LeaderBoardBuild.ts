import { IMatch } from '../Interfaces/Match';
import { ILeaderBoardResponse, Local } from '../Interfaces/LeaderBoard';
import { ITeam } from '../Interfaces/Team';

// type LocalTeamIndex = 'homeTeamId' | 'awayTeamId';

export default class LeaderBoardBuild {
  private _localMatches: IMatch[] = [];
  private _otherLocal: Local = this.local === 'home' ? 'away' : 'home';

  constructor(
    private local: Local = 'home',
    private matches: IMatch[] = [],
    private teams: ITeam[] = [],
  ) {}

  private calculateTotalPoints(): number {
    const totalVictories = this.calculateVictories() * 3;
    const totalDraws = this.calculateDraws();

    return totalVictories + totalDraws;
  }

  private calculateGoalsOwn() {
    const goalsOwn = this._localMatches
      .reduce((total, match) => total + match[`${this._otherLocal}TeamGoals`], 0);
    return goalsOwn;
  }

  private calculateGoalsFavor() {
    const goalsFavor = this._localMatches
      .reduce((total, match) => total + match[`${this.local}TeamGoals`], 0);
    return goalsFavor;
  }

  private calculateBalance() {
    const goalsFavor = this.calculateGoalsFavor();
    const goalsOwn = this.calculateGoalsOwn();
    return goalsFavor - goalsOwn;
  }

  private calculateEfficiency() {
    const totalPoints = this.calculateTotalPoints();
    const efficiency = (totalPoints / (this._localMatches.length * 3)) * 100;

    return Number(efficiency.toFixed(2));
  }

  private calculateVictories() {
    const totalVictories = this._localMatches
      .filter((match) =>
        match[`${this.local}TeamGoals`] > match[`${this._otherLocal}TeamGoals`]).length;
    return totalVictories;
  }

  private calculateLosses() {
    const totalLosses = this._localMatches
      .filter((match) =>
        match[`${this.local}TeamGoals`] < match[`${this._otherLocal}TeamGoals`]).length;
    return totalLosses;
  }

  private calculateDraws() {
    const totalDraws = this._localMatches
      .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    return totalDraws;
  }

  // Implementado com ajuda do GTP
  static sortLeaderBoard(result: ILeaderBoardResponse[]) {
    result.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }

      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }

      return b.goalsFavor - a.goalsFavor;
    });
    return result;
  }

  private defineLocalMatches(team: ITeam) {
    if (this.local === 'home') {
      this._localMatches = this.matches.filter((match) => match.homeTeamId === team.id);
    } else {
      this._localMatches = this.matches.filter((match) => match.awayTeamId === team.id);
    }
  }

  public buildHomeBoard(): ILeaderBoardResponse[] {
    const result: ILeaderBoardResponse[] = [];

    this.teams.forEach((team) => {
      // const homeMatches = matches.filter((match) => match.homeTeamId === team.id);
      this.defineLocalMatches(team);

      result.push({
        name: team.teamName,
        totalPoints: this.calculateTotalPoints(),
        totalGames: this._localMatches.length,
        totalVictories: this.calculateVictories(),
        totalDraws: this.calculateDraws(),
        totalLosses: this.calculateLosses(),
        goalsFavor: this.calculateGoalsFavor(),
        goalsOwn: this.calculateGoalsOwn(),
        goalsBalance: this.calculateBalance(),
        efficiency: this.calculateEfficiency(),
      });
    });

    return LeaderBoardBuild.sortLeaderBoard(result);
  }
}
