import { CardType, CharacterClass, Rarity, EffectType, EffectTiming, TargetType, EffectCondition } from '../enums/GameEnums';

export interface ICard {
  id: string;
  name: string;
  cost: number;
  attack?: number;
  defense?: number;
  effects: IEffect[];
  cardType: CardType;
  class: CharacterClass;
  rarity: Rarity;
  description: string;
}

export interface IEffect {
  type: EffectType;
  value: number;
  target: TargetType;
  timing: EffectTiming;
  condition?: EffectCondition;
} 