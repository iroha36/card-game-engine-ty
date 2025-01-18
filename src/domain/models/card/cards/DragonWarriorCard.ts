import { FollowerCard } from '../types/FollowerCard';
import { createCardId } from '../../types/primitives';
import { PP } from '../../valueObjects/PP';
import { GameState } from '../../game/GameState';
import { PlayerId } from '../../types/primitives';
import { Effect, EffectType, TargetType } from '../Effect';
import { CharacterClass, Rarity } from '../../types/enums';

export class DragonWarriorCard extends FollowerCard {
  constructor() {
    const buffEffect: Effect = {
      type: EffectType.BUFF,
      value: 2,
      target: TargetType.FOLLOWER,
      apply: (gameState: GameState) => {
        const updatedCard = new DragonWarriorCard();
        const updatedProps = this.createUpdatedProps(
          this.attack + 2,
          this.defense + 2,
          this.canAttack
        );
        Object.assign(updatedCard, this, { followerProps: updatedProps });

        const updatedBoard = gameState.board.updateCard(this.id, updatedCard);
        return GameState.create({
          ...gameState.getProps(),
          board: updatedBoard
        });
      }
    };

    super({
      id: createCardId('DRAGON_001'),
      name: 'ドラゴンの戦士',
      cost: PP.create(5),
      effects: [buffEffect],
      attack: 4,
      defense: 4,
      canAttack: true,
      class: CharacterClass.DRAGON,
      rarity: Rarity.GOLD,
      description: 'プレイ時: 自身の攻撃力と体力を+2/+2する'
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
    
    // バフ効果を適用
    for (const effect of this.effects) {
      updatedState = effect.apply(updatedState);
    }

    return updatedState;
  }
} 