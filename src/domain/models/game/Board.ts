import { Card } from '../card/Card';
import { CardId } from '../types/primitives';

export class Board {
  constructor(private readonly cards: ReadonlyMap<number, Card>) {}

  static empty(): Board {
    return new Board(new Map());
  }

  getCards(): ReadonlyMap<number, Card> {
    return this.cards;
  }

  withCardPlayed(position: number, card: Card): Board {
    const newCards = new Map(this.cards);
    newCards.set(position, card);
    return new Board(newCards);
  }

  updateCard(cardId: CardId, updatedCard: Card): Board {
    const newCards = new Map(this.cards);
    for (const [pos, card] of newCards.entries()) {
      if (card.id === cardId) {
        newCards.set(pos, updatedCard);
        break;
      }
    }
    return new Board(newCards);
  }
} 