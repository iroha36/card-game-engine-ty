import { ICard, IEffect } from '../../interfaces/ICard';
import { CardType, CharacterClass, Rarity, EffectTiming } from '../../enums/GameEnums';
import { Game } from '../game/Game';
import { Player } from '../player/Player';

export abstract class Card implements ICard {
  public readonly id: string;
  public readonly name: string;
  public readonly cost: number;
  public readonly effects: IEffect[];
  public readonly cardType: CardType;
  public readonly class: CharacterClass;
  public readonly rarity: Rarity;
  public readonly description: string;

  constructor(
    id: string,
    name: string,
    cost: number,
    effects: IEffect[],
    cardType: CardType,
    characterClass: CharacterClass,
    rarity: Rarity,
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.effects = effects;
    this.cardType = cardType;
    this.class = characterClass;
    this.rarity = rarity;
    this.description = description;
  }

  abstract play(game: Game, player: Player, target?: any): void;
}

export class FollowerCard extends Card {
  public attack: number;
  public defense: number;
  public canAttack: boolean = true;

  constructor(
    id: string,
    name: string,
    cost: number,
    attack: number,
    defense: number,
    effects: IEffect[],
    characterClass: CharacterClass,
    rarity: Rarity,
    description: string
  ) {
    super(id, name, cost, effects, CardType.FOLLOWER, characterClass, rarity, description);
    this.attack = attack;
    this.defense = defense;
  }

  play(game: Game, player: Player, target?: any): void {
    // フォロワーを場に出す処理
    player.playArea.addFollower(this);
    // エフェクトの処理
    this.effects
      .filter(effect => effect.timing === EffectTiming.ON_PLAY)
      .forEach(effect => game.processEffect(effect, this, player, target));
  }

  attackTarget(game: Game, target: Player | FollowerCard): void {
    if (!this.canAttack) return;
    if (target instanceof Player) {
      target.health -= this.attack;
    } else {
      target.defense -= this.attack;
      this.defense -= target.attack;
    }
    this.canAttack = false;
  }
} 