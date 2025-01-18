import { GameState } from '../../domain/models/game/GameState';
import { PlayerState } from '../../domain/models/player/PlayerState';
import { createPlayerId, PlayerId } from '../../domain/models/types/primitives';
import { PP } from '../../domain/models/valueObjects/PP';
import { Health } from '../../domain/models/valueObjects/Health';
import { GoblinCard } from '../../domain/models/card/cards/GoblinCard';
import { HealingAngelCard } from '../../domain/models/card/cards/HealingAngelCard';
import { Board } from '../../domain/models/game/Board';
import { FollowerCard } from '../../domain/models/card/types/FollowerCard';
import { DragonWarriorCard } from '../../domain/models/card/cards/DragonWarriorCard';

export class AutoBattleService {
  private gameState: GameState;

  constructor() {
    const player1Id = createPlayerId('P1');
    const player2Id = createPlayerId('P2');

    const player1 = PlayerState.create({
      id: player1Id,
      deck: this.createInitialDeck(),
      hand: [],
      pp: PP.create(0),
      health: Health.create(20)
    });

    const player2 = PlayerState.create({
      id: player2Id,
      deck: this.createInitialDeck(),
      hand: [],
      pp: PP.create(0),
      health: Health.create(20)
    });

    const players = new Map([
      [player1Id, player1],
      [player2Id, player2]
    ]);

    this.gameState = GameState.create({
      turn: 0,
      activePlayer: player1Id,
      players,
      board: Board.empty()
    });
  }

  private createInitialDeck() {
    return Array(20).fill(null).map(() => {
      const random = Math.random();
      if (random < 0.4) return new GoblinCard();
      if (random < 0.7) return new HealingAngelCard();
      return new DragonWarriorCard();
    });
  }

  async startBattle(): Promise<void> {
    console.log('=== Battle Start ===');
    
    while (!this.isGameOver()) {
      await this.processTurn();
      this.gameState = this.gameState.nextTurn();
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('=== Battle End ===');
    this.printResult();
  }

  private async processTurn(): Promise<void> {
    const activePlayer = this.gameState.players.get(this.gameState.activePlayer)!;
    const opponentId = Array.from(this.gameState.players.keys())
      .find(id => id !== activePlayer.id)!;

    console.log(`\n${activePlayer.id} のターン (${this.gameState.turn}ターン目)`);
    this.printGameState();

    // PPを増やす（最大10）
    const updatedPP = PP.create(Math.min(this.gameState.turn, 10));
    const playerWithUpdatedPP = activePlayer.withPP(updatedPP);
    this.gameState = this.gameState.withUpdatedPlayer(activePlayer.id, playerWithUpdatedPP);

    // カードを1枚引く
    this.gameState = this.drawCard(activePlayer.id);

    // 手札のカードをコストが支払える限り全て使用
    for (const card of activePlayer.hand) {
      if (card.canPlay(this.gameState, activePlayer.id)) {
        console.log(`${card.name} をプレイ (コスト: ${card.cost.get()})`);
        this.gameState = card.play(this.gameState, activePlayer.id);
        this.printGameState();
      }
    }

    // フォロワーで攻撃
    const board = this.gameState.board;
    for (const [_, card] of board.getCards()) {
      if (card instanceof FollowerCard && card.canAttack) {
        console.log(`${card.name} で攻撃 (攻撃力: ${card.attack})`);
        this.gameState = card.attackTarget(this.gameState, opponentId);
        const opponent = this.gameState.players.get(opponentId)!;
        console.log(`→ ${opponent.id}のリーダーに${card.attack}ダメージ (残りHP: ${opponent.health.get()})`);
      }
    }
  }

  private drawCard(playerId: PlayerId): GameState {
    const player = this.gameState.players.get(playerId)!;
    if (player.deck.length === 0) {
      // デッキ切れダメージ
      const updatedHealth = player.health.damage(2);
      const updatedPlayer = player.withHealth(updatedHealth);
      return this.gameState.withUpdatedPlayer(playerId, updatedPlayer);
    }

    const [newCard, ...remainingDeck] = player.deck;
    const updatedHand = [...player.hand, newCard];
    const updatedPlayer = player.withUpdatedHand(updatedHand).withUpdatedDeck(remainingDeck);
    return this.gameState.withUpdatedPlayer(playerId, updatedPlayer);
  }

  private isGameOver(): boolean {
    return Array.from(this.gameState.players.values())
      .some(player => player.health.isDead());
  }

  private printGameState(): void {
    for (const [id, player] of this.gameState.players) {
      console.log(`\nPlayer ${id}:`);
      console.log(`  Health: ${player.health.get()}`);
      console.log(`  PP: ${player.pp.get()}`);
      console.log(`  Hand: ${player.hand.map(c => c.name).join(', ')}`);
    }
  }

  private printResult(): void {
    const winner = Array.from(this.gameState.players.entries())
      .find(([_, player]) => !player.health.isDead());
    
    if (winner) {
      console.log(`Winner: Player ${winner[0]} (Health: ${winner[1].health.get()})`);
    } else {
      console.log('Draw!');
    }
  }
} 