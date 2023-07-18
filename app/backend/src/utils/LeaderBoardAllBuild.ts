import { IMatch } from '../Interfaces/Match';
import { ILeaderBoardResponse, Local } from '../Interfaces/LeaderBoard';
import { ITeam } from '../Interfaces/Team';

// type LocalTeamIndex = 'homeTeamId' | 'awayTeamId';

export default class LeaderBoardBuildAll {
  private _localMatches: IMatch[] = [];
  private _otherLocal: Local = this.local === 'home' ? 'away' : 'home';
  private mergedArrays: ILeaderBoardResponse[] = [];

  constructor(
    private local: Local = 'home',
    private matches: IMatch[] = [],
    private teams: ITeam[] = [],
  ) {}

  private calculateTotalPoints(): number {
    // console.log('CALCULANDO TOTAL POINTS');
    const totalVictories = this.calculateVictories() * 3;
    // console.log('TOTAL VICTORIES:', totalVictories);
    const totalDraws = this.calculateDraws();
    // console.log('TOTAL DRAW:', totalDraws);

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

    // this._localMatches = this.matches.filter((match) =>
    //   match.homeTeamId === team.id || match.awayTeamId === team.id);
  }

  private mergeArrays(allArray: ILeaderBoardResponse[]) {
    // console.log('CHAMA MERGE ARRAYS!!!')
    allArray.forEach((obj1) => {
      const matchingObj = allArray.find((obj2) => obj2.name === obj1.name);
      if (matchingObj) {
        const mergedObj = {
          name: obj1.name,
          totalPoints: obj1.totalPoints + matchingObj.totalPoints,
          totalGames: obj1.totalGames + matchingObj.totalGames,
          totalVictories: obj1.totalVictories + matchingObj.totalVictories,
          totalDraws: obj1.totalDraws + matchingObj.totalDraws,
          totalLosses: obj1.totalLosses + matchingObj.totalLosses,
          goalsFavor: obj1.goalsFavor + matchingObj.goalsFavor,
          goalsOwn: obj1.goalsOwn + matchingObj.goalsOwn,
          goalsBalance: obj1.goalsBalance + matchingObj.goalsBalance,
          efficiency: (obj1.efficiency + matchingObj.efficiency) / 2,
        };
        this.mergedArrays.push(mergedObj);
        // console.log('MERGED ARRAY:', this.mergedArrays)
      }
    });
  }

  public calculateAll() {
    console.log('CHAMA CALCULAT ALL');
    this.local = 'home';
    console.log('THIS LOCAL:', this.local);
    const homeResults: ILeaderBoardResponse[] = this.buildLocalBoard();
    this.local = 'away';
    console.log('THIS LOCAL:', this.local);
    const awayResults: ILeaderBoardResponse[] = this.buildLocalBoard();
    // LeaderBoardBuildAll.calculateFinal(homeResults, awayResults);
    const allArray: ILeaderBoardResponse[] = [...homeResults, ...awayResults];
    this.mergeArrays(allArray);

    return this.mergedArrays;
  }

  public buildLocalBoard(): ILeaderBoardResponse[] {
    const result: ILeaderBoardResponse[] = [];

    this.teams.forEach((team: ITeam) => {
      // const homeMatches = matches.filter((match) => match.homeTeamId === team.id);
      this.defineLocalMatches(team);
      console.log('CHAMA BUILD');
      // console.log('TEAM NAME:', team.teamName);
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

    return LeaderBoardBuildAll.sortLeaderBoard(result);
  }
}

/*
Não consegui implementar uma logica que funciione dentro das limitações do projeto,
que retorne o leaderBoard de todas as partidas...
*/
