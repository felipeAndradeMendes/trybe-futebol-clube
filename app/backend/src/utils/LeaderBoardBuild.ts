import { IMatch } from '../Interfaces/Match';
import { ILeaderBoardResponse } from '../Interfaces/LeaderBoard';
import { ITeam } from '../Interfaces/Team';

export default class LeaderBoardBuild {
  // static tName = '';
  // private totalPoints = 0;
  // private totalGames = 0;
  // private totalVictories = 0;
  // private totalDraws = 0;
  // private totalLosses = 0;
  // private goalsFavor = 0;
  // private goalsOwn = 0;
  // private goalsBalance = 0;
  // private efficiency = 0;

  static calculateTotalPoints(totalMatches: IMatch[]): number {
    const totalPoints = totalMatches.reduce((total, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        return total + 3;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);
    return totalPoints;
  }

  static calculateGoalsOwn(totalMatches: IMatch[]) {
    const goalsOwn = totalMatches
      .reduce((total, match) => total + match.awayTeamGoals, 0);
    return goalsOwn;
  }

  static calculateGoalsFavor(totalMatches: IMatch[]) {
    const goalsFavor = totalMatches
      .reduce((total, match) => total + match.homeTeamGoals, 0);
    return goalsFavor;
  }

  static calculateBalance(totalMatches: IMatch[]) {
    const goalsFavor = LeaderBoardBuild.calculateGoalsFavor(totalMatches);
    const goalsOwn = LeaderBoardBuild.calculateGoalsOwn(totalMatches);
    return goalsFavor - goalsOwn;
  }

  static calculateEfficiency(totalMatches: IMatch[]) {
    const totalPoints = LeaderBoardBuild.calculateTotalPoints(totalMatches);

    const efficiency = (totalPoints / (totalMatches.length * 3)) * 100;

    return Number(efficiency.toFixed(2));
  }

  static calculateVictories(totalMatches: IMatch[]) {
    const totalVictories = totalMatches
      .filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    return totalVictories;
  }

  static calculateLosses(totalMatches: IMatch[]) {
    const totalLosses = totalMatches
      .filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    return totalLosses;
  }

  static calculateDraws(totalMatches: IMatch[]) {
    const totalDraws = totalMatches
      .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    return totalDraws;
  }

  static buildHomeBoard(matches: IMatch[], teams: ITeam[]): ILeaderBoardResponse[] {
    const result: ILeaderBoardResponse[] = [];
    teams.forEach((team) => {
      const homeMatches = matches.filter((match) => match.homeTeamId === team.id);
      result.push({
        name: team.teamName,
        totalPoints: this.calculateTotalPoints(homeMatches),
        totalGames: homeMatches.length,
        totalVictories: LeaderBoardBuild.calculateVictories(homeMatches),
        totalDraws: LeaderBoardBuild.calculateDraws(homeMatches),
        totalLosses: LeaderBoardBuild.calculateLosses(homeMatches),
        goalsFavor: LeaderBoardBuild.calculateGoalsFavor(homeMatches),
        goalsOwn: LeaderBoardBuild.calculateGoalsOwn(homeMatches),
        goalsBalance: LeaderBoardBuild.calculateBalance(homeMatches),
        efficiency: LeaderBoardBuild.calculateEfficiency(homeMatches),
      });
    });
    return result;
  }
}
