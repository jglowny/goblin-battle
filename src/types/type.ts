export type Goblin = {
  name: string;
  attack: number;
  defense: number;
};

export type Team = {
  position?: number;
  name: string;
  team: Goblin[];
  battle: number;
  victories: number;
  lost: number;
  points: number;
};

export type Teams = Team[];

export type BattleResult = {
  goblinAAlive: boolean;
  goblinBAlive: boolean;
};
