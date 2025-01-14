import { Card, FollowerCard } from '../Card';
import { CardType, CharacterClass, Rarity } from '../../../enums/GameEnums';

export class OgreCard extends FollowerCard {
  constructor() {
    super(
      'BASIC_002',
      'オーガ',
      3, // コスト
      3, // 攻撃力
      4, // 体力
      [], // 効果なし
      CharacterClass.NEUTRAL,
      Rarity.BRONZE,
      '基本的な3/4フォロワー'
    );
  }
} 