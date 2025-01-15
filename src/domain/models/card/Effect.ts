import { GameState } from '../game/GameState';

export interface Effect {
  readonly type: EffectType;
  readonly value: number;
  readonly target: TargetType;
  
  apply(gameState: GameState): GameState;
}

export enum EffectType {
  DAMAGE = 'DAMAGE',
  HEAL = 'HEAL',
  DRAW = 'DRAW',
  BUFF = 'BUFF'
}

export enum TargetType {
  PLAYER = 'PLAYER',
  FOLLOWER = 'FOLLOWER',
  ALL = 'ALL'
} 