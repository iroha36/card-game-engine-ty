import { Card } from '../Card';
import { CardType, CharacterClass, Rarity, EffectType, EffectTiming, TargetType } from '../../../enums/GameEnums';
import { IEffect } from '../../../interfaces/ICard';
import { Game } from '../../game/Game';
import { Player } from '../../player/Player';

export class FireballCard extends Card {
  constructor() {
    const damageEffect: IEffect = {
      type: EffectType.DAMAGE,
      value: 3,
      target: TargetType.ENEMY,
      timing: EffectTiming.ON_PLAY
    };

    super(
      'BASIC_004',
      'ファイアボール',
      2, // コスト
      [damageEffect],
      CardType.SPELL,
      CharacterClass.RUNE,
      Rarity.BRONZE,
      '相手のフォロワー1体に3ダメージ'
    );
  }

  play(game: Game, player: Player, target?: any): void {
    if (!target) return;
    this.effects.forEach(effect => game.processEffect(effect, this, player, target));
  }
} 