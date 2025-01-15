import { Card, CardProps } from '../Card';
import { GameState } from '../../game/GameState';
import { PlayerId } from '../../types/primitives';
import { Health } from '../../valueObjects/Health';

export interface FollowerCardProps extends CardProps {
  readonly attack: number;
  readonly defense: number;
  readonly canAttack: boolean;
}

export abstract class FollowerCard extends Card {
  constructor(private readonly followerProps: FollowerCardProps) {
    super(followerProps);
  }

  get attack(): number {
    return this.followerProps.attack;
  }

  get defense(): number {
    return this.followerProps.defense;
  }

  get canAttack(): boolean {
    return this.followerProps.canAttack;
  }

  attackTarget(gameState: GameState, target: PlayerId): GameState {
    if (!this.canAttack) return gameState;
    
    const targetPlayer = gameState.players.get(target);
    if (!targetPlayer) throw new Error('Target player not found');

    const updatedHealth = targetPlayer.health.damage(this.attack);
    const updatedPlayer = targetPlayer.withHealth(updatedHealth);
    
    const updatedCard = new (this.constructor as any)();
    Object.assign(updatedCard, this, { followerProps: { ...this.followerProps, canAttack: false } });

    const updatedBoard = gameState.board.updateCard(this.id, updatedCard);
    
    return GameState.create({
      ...gameState.getProps(),
      players: new Map(gameState.players).set(target, updatedPlayer),
      board: updatedBoard
    });
  }
} 