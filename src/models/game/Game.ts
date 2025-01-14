import { Player } from '../player/Player';
import { IEffect } from '../../interfaces/ICard';
import { Card, FollowerCard } from '../card/Card';
import { EffectType, EffectTiming } from '../../enums/GameEnums';

export class Game {
  private currentTurn: number;
  private activePlayer: Player;
  private players: [Player, Player];

  constructor(player1: Player, player2: Player) {
    this.players = [player1, player2];
    this.currentTurn = 0;
    this.activePlayer = player1;
    
    // 初期設定
    this.initializeGame();
  }

  private initializeGame(): void {
    // 各プレイヤーに初期手札を配る
    this.players.forEach(player => {
      player.drawCard(3);
      player.maxPP = 0;
      player.currentPP = 0;
    });
  }

  public startTurn(): void {
    this.currentTurn++;
    this.activePlayer.maxPP = Math.min(this.currentTurn, 10);
    this.activePlayer.currentPP = this.activePlayer.maxPP;
    this.activePlayer.drawCard();
    
    // ターン開始時のエフェクトを処理
    this.processStartOfTurnEffects();
  }

  private processStartOfTurnEffects(): void {
    this.activePlayer.playArea.getAllCards()
      .forEach((card: Card) => {
        card.effects
          .filter(effect => effect.timing === EffectTiming.START_OF_TURN)
          .forEach(effect => this.processEffect(effect, card, this.activePlayer));
      });
  }

  public processEffect(effect: IEffect, source: Card | null, player: Player, target?: any): void {
    // エフェクトの処理を実装
    switch (effect.type) {
      case EffectType.DAMAGE:
        if (target instanceof Player) {
          target.health -= effect.value;
        } else if (target instanceof FollowerCard) {
          target.defense -= effect.value;
        }
        break;
      case EffectType.HEAL:
        if (target instanceof Player) {
          target.health = Math.min(20, target.health + effect.value);
        }
        break;
      // 他のエフェクトの処理...
    }
  }

  public getActivePlayer(): Player {
    return this.activePlayer;
  }

  public getOpponentPlayer(): Player {
    return this.players.find(p => p !== this.activePlayer)!;
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public getCurrentTurn(): number {
    return this.currentTurn;
  }
} 