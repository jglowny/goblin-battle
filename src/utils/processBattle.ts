import type { Team, Teams, Goblin, BattleResult } from "../types/type";
import getRandomValue from "../utils/GetRandomValue";

export const randomTeam = (teams: Teams): Team => {
  const results = teams[getRandomValue(0, teams.length - 1)];
  return results;
};

export const randomGoblin = (selectedTeam: Team) => {
  const randomIndex = Math.floor(Math.random() * selectedTeam.team.length);
  return randomIndex;
};

export const getRandomGoblin = (team: Team) => {
  const randomIndex = randomGoblin(team);
  return team.team[randomIndex];
};

export const fightGoblinVsGoblin = (
  goblinA: Goblin,
  goblinB: Goblin
): BattleResult => {
  const goblinAAlive = goblinA.attack <= goblinB.defense;
  const goblinBAlive = goblinB.attack <= goblinA.defense;
  return {
    goblinAAlive,
    goblinBAlive,
  };
};
