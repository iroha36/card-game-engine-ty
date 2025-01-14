import { Card } from '../card/Card';
import { IEffect } from '../../interfaces/ICard';
import { CardType, CharacterClass, Rarity } from '../../enums/GameEnums';
import { Game } from '../game/Game';
import { Player } from '../player/Player';
import { EffectTiming } from '../../enums/GameEnums';

export class CountdownAmulet extends Card {
  public countdown: number;

  constructor(
    id: string,
    name: string,
    cost: number,
    countdown: number,
    effects: IEffect[],
    characterClass: CharacterClass,
    rarity: Rarity,
    description: string
  ) {
    super(id, name, cost, effects, CardType.AMULET, characterClass, rarity, description);
    this.countdown = countdown;
  }

  reduceCountdown(): void {
    this.countdown--;
    if (this.countdown <= 0) {
      this.activate();
    }
  }

  private activate(): void {
    // カウントダウン達成時の効果を発動
  }

  play(game: Game, player: Player, target?: any): void {
    player.playArea.addAmulet(this);
    this.effects
      .filter(effect => effect.timing === EffectTiming.ON_PLAY)
      .forEach(effect => game.processEffect(effect, this, player, target));
  }
} 