import { PlayerId } from '../types/primitives';
import { Card } from '../card/Card';
import { PlayerState } from '../player/PlayerState';
import { Board } from './Board';

export interface GameStateProps {
  readonly turn: number;
  readonly activePlayer: PlayerId;
  readonly players: ReadonlyMap<PlayerId, PlayerState>;
  readonly board: Board;
}

export class GameState {
  private constructor(private readonly props: GameStateProps) {}

  static create(props: GameStateProps): GameState {
    return new GameState(props);
  }

  get turn(): number {
    return this.props.turn;
  }

  get activePlayer(): PlayerId {
    return this.props.activePlayer;
  }

  get players(): ReadonlyMap<PlayerId, PlayerState> {
    return this.props.players;
  }

  get board(): Board {
    return this.props.board;
  }

  withCardPlayed(card: Card, playerId: PlayerId): GameState {
    const updatedPlayers = new Map(this.props.players);
    const playerState = updatedPlayers.get(playerId);
    if (!playerState) throw new Error('Player not found');

    const updatedPlayerState = playerState.withCardPlayed(card);
    updatedPlayers.set(playerId, updatedPlayerState);

    return new GameState({
      ...this.props,
      players: updatedPlayers,
    });
  }

  nextTurn(): GameState {
    const playerIds = Array.from(this.props.players.keys());
    const currentIndex = playerIds.indexOf(this.props.activePlayer);
    const nextPlayer = playerIds[(currentIndex + 1) % playerIds.length];

    return new GameState({
      ...this.props,
      turn: this.props.turn + 1,
      activePlayer: nextPlayer,
    });
  }

  withUpdatedPlayer(playerId: PlayerId, player: PlayerState): GameState {
    const updatedPlayers = new Map(this.props.players);
    updatedPlayers.set(playerId, player);
    
    return new GameState({
      ...this.props,
      players: updatedPlayers
    });
  }

  getProps(): GameStateProps {
    return { ...this.props };
  }
} 