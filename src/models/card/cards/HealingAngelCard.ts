import { Card, FollowerCard } from '../Card';
import { CardType, CharacterClass, Rarity, EffectType, EffectTiming, TargetType } from '../../../enums/GameEnums';
import { IEffect } from '../../../interfaces/ICard';

export class HealingAngelCard extends FollowerCard {
  constructor() {
    const healEffect: IEffect = {
      type: EffectType.HEAL,
      value: 2,
      target: TargetType.ALLY_LEADER,
      timing: EffectTiming.ON_PLAY
    };

    super(
      'BASIC_003',
      '癒しの天使',
      2, // コスト
      1, // 攻撃力
      1, // 体力
      [healEffect],
      CharacterClass.HAVEN,
      Rarity.BRONZE,
      'プレイ時：自分のリーダーを2回復'
    );
  }
} 