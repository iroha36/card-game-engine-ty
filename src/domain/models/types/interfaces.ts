import { CardType, CharacterClass, Rarity, EffectType, EffectTiming, TargetType } from './enums';
import { CardId, PlayerId } from './primitives';
import { GameState } from '../game/GameState';

export interface IEffect {
  readonly type: EffectType;
  readonly value: number;
  readonly target: TargetType;
  readonly timing: EffectTiming;
  apply(gameState: GameState): GameState;
}

export interface ICard {
  readonly id: CardId;
  readonly name: string;
  readonly cost: number;
  readonly effects: ReadonlyArray<IEffect>;
  readonly cardType: CardType;
  readonly class: CharacterClass;
  readonly rarity: Rarity;
  readonly description: string;
  
  canPlay(gameState: GameState, playerId: PlayerId): boolean;
  play(gameState: GameState, playerId: PlayerId): GameState;
} 