import { FollowerCard } from '../types/FollowerCard';
import { createCardId } from '../../types/primitives';
import { PP } from '../../valueObjects/PP';
import { GameState } from '../../game/GameState';
import { PlayerId } from '../../types/primitives';
import { Effect, EffectType, TargetType } from '../Effect';

export class HealingAngelCard extends FollowerCard {
  constructor() {
    const healEffect: Effect = {
      type: EffectType.HEAL,
      value: 2,
      target: TargetType.PLAYER,
      apply: (gameState: GameState) => {
        const player = gameState.players.get(gameState.activePlayer);
        if (!player) throw new Error('Player not found');
        
        const updatedHealth = player.health.heal(2);
        const updatedPlayer = player.withHealth(updatedHealth);
        
        return gameState.withUpdatedPlayer(gameState.activePlayer, updatedPlayer);
      }
    };

    super({
      id: createCardId('BASIC_002'),
      name: '癒しの天使',
      cost: PP.create(2),
      effects: [healEffect],
      attack: 1,
      defense: 1,
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

    let updatedState = gameState.withCardPlayed(this, playerId);
    
    // Apply heal effect
    for (const effect of this.effects) {
      updatedState = effect.apply(updatedState);
    }

    return updatedState;
  }
} 