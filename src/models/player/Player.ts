import { Card } from '../card/Card';
import { Game } from '../game/Game';
import { PlayArea } from './PlayArea';

export class Player {
  public deck: Card[];
  public hand: Card[];
  public playArea: PlayArea;
  public graveyard: Card[];
  public evolutionPoints: number;
  public maxPP: number;
  public currentPP: number;
  public health: number;

  constructor(
    public readonly id: string,
    public readonly name: string,
    deckList: Card[]
  ) {
    this.deck = [...deckList];
    this.hand = [];
    this.playArea = new PlayArea();
    this.graveyard = [];
    this.evolutionPoints = 0;
    this.maxPP = 0;
    this.currentPP = 0;
    this.health = 20;
  }

  drawCard(count: number = 1): void {
    for (let i = 0; i < count; i++) {
      if (this.deck.length > 0) {
        const card = this.deck.pop();
        if (card) this.hand.push(card);
      }
    }
  }

  playCard(card: Card, game: Game, target?: any): void {
    if (this.currentPP >= card.cost) {
      const index = this.hand.indexOf(card);
      if (index !== -1) {
        this.hand.splice(index, 1);
        this.currentPP -= card.cost;
        card.play(game, this, target);
      }
    }
  }
} 