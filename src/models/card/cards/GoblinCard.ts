import { Card, FollowerCard } from '../Card';
import { CardType, CharacterClass, Rarity } from '../../../enums/GameEnums';

export class GoblinCard extends FollowerCard {
  constructor() {
    super(
      'BASIC_001',
      'ゴブリン',
      1, // コスト
      1, // 攻撃力
      2, // 体力
      [], // 効果なし
      CharacterClass.NEUTRAL,
      Rarity.BRONZE,
      '基本的な1/2フォロワー'
    );
  }
} 