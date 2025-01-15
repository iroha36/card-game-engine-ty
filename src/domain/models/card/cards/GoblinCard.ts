import { FollowerCard, FollowerCardProps } from '../types/FollowerCard';
import { createCardId } from '../../types/primitives';
import { PP } from '../../valueObjects/PP';
import { GameState } from '../../game/GameState';
import { PlayerId } from '../../types/primitives';

export class GoblinCard extends FollowerCard {
  constructor() {
    super({
      id: createCardId('BASIC_001'),
      name: 'ゴブリン',
      cost: PP.create(1),
      effects: [],
      attack: 1,
      defense: 2,
      canAttack: true
    });
  }

  canPlay(gameState: GameState, playerId: PlayerId): boolean {
    const player = gameState.players.get(playerId);
    return player?.pp.isEnough(this.cost) ?? false;
  }

  play(gameState: GameState, playerId: PlayerId): GameState {
    if (!this.canPlay(gameState, playerId)) {
      throw new Error('Cannot play this card');
    }

    return gameState.withCardPlayed(this, playerId);
  }
} 