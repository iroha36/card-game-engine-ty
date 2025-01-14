import { IEffect } from '../../interfaces/ICard';
import { Game } from '../game/Game';
import { Player } from './Player';

interface ILeaderSkill {
  name: string;
  cost: number;
  effect: IEffect;
  isAvailable: boolean;
  use(game: Game, player: Player): void;
}

class LeaderSkill implements ILeaderSkill {
  public isAvailable: boolean;

  constructor(
    public name: string,
    public cost: number,
    public effect: IEffect
  ) {
    this.isAvailable = true;
  }

  use(game: Game, player: Player): void {
    if (this.isAvailable && player.currentPP >= this.cost) {
      player.currentPP -= this.cost;
      game.processEffect(this.effect, null, player);
      this.isAvailable = false;
    }
  }
} 