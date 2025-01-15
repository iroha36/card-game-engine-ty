import { CardId, PlayerId } from '../types/primitives';
import { PP } from '../valueObjects/PP';
import { GameState } from '../game/GameState';
import { Effect } from './Effect';

export interface CardProps {
  readonly id: CardId;
  readonly name: string;
  readonly cost: PP;
  readonly effects: ReadonlyArray<Effect>;
}

export abstract class Card {
  constructor(private readonly props: CardProps) {}

  get id(): CardId {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get cost(): PP {
    return this.props.cost;
  }

  get effects(): ReadonlyArray<Effect> {
    return this.props.effects;
  }

  abstract canPlay(gameState: GameState, playerId: PlayerId): boolean;
  abstract play(gameState: GameState, playerId: PlayerId): GameState;
} 