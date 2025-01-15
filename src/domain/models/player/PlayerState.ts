import { PlayerId } from '../types/primitives';
import { Card } from '../card/Card';
import { PP } from '../valueObjects/PP';
import { Health } from '../valueObjects/Health';

export interface PlayerStateProps {
  readonly id: PlayerId;
  readonly deck: ReadonlyArray<Card>;
  readonly hand: ReadonlyArray<Card>;
  readonly pp: PP;
  readonly health: Health;
}

export class PlayerState {
  private constructor(private readonly props: PlayerStateProps) {}

  static create(props: PlayerStateProps): PlayerState {
    return new PlayerState(props);
  }

  get id(): PlayerId {
    return this.props.id;
  }

  get health(): Health {
    return this.props.health;
  }

  get pp(): PP {
    return this.props.pp;
  }

  get hand(): ReadonlyArray<Card> {
    return this.props.hand;
  }

  get deck(): ReadonlyArray<Card> {
    return this.props.deck;
  }

  withHealth(health: Health): PlayerState {
    return new PlayerState({
      ...this.props,
      health
    });
  }

  withCardPlayed(card: Card): PlayerState {
    return new PlayerState({
      ...this.props,
      hand: this.props.hand.filter(c => c.id !== card.id),
      pp: this.props.pp.subtract(card.cost)
    });
  }

  withPP(pp: PP): PlayerState {
    return new PlayerState({
      ...this.props,
      pp
    });
  }

  withUpdatedHand(hand: ReadonlyArray<Card>): PlayerState {
    return new PlayerState({
      ...this.props,
      hand
    });
  }

  withUpdatedDeck(deck: ReadonlyArray<Card>): PlayerState {
    return new PlayerState({
      ...this.props,
      deck
    });
  }
} 