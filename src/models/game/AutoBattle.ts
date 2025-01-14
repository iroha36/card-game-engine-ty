import { Game } from './Game';
import { Player } from '../player/Player';
import { Card, FollowerCard } from '../card/Card';
import { GoblinCard } from '../card/cards/GoblinCard';
import { OgreCard } from '../card/cards/OgreCard';
import { HealingAngelCard } from '../card/cards/HealingAngelCard';
import { FireballCard } from '../card/cards/FireballCard';

export class AutoBattle {
  private game: Game;

  constructor() {
    const deck1 = this.createSampleDeck();
    const deck2 = this.createSampleDeck();
    
    const player1 = new Player('P1', 'プレイヤー1', deck1);
    const player2 = new Player('P2', 'プレイヤー2', deck2);
    
    this.game = new Game(player1, player2);
  }

  private createSampleDeck(): Card[] {
    const deck = [];
    // 各カードを10枚ずつ追加
    for (let i = 0; i < 10; i++) {
      deck.push(new GoblinCard());
      deck.push(new OgreCard());
      deck.push(new HealingAngelCard());
      deck.push(new FireballCard());
    }
    return this.shuffleDeck(deck);
  }

  private shuffleDeck(deck: Card[]): Card[] {
    return deck.sort(() => Math.random() - 0.5);
  }

  public async startAutoBattle(): Promise<void> {
    console.log('\n=== ゲーム開始 ===');
    console.log('プレイヤー1:', this.game.getPlayers()[0].name);
    console.log('プレイヤー2:', this.game.getPlayers()[1].name);
    
    while (!this.isGameOver()) {
      await this.playTurn();
      this.game.startTurn();
    }
    
    const winner = this.getWinner();
    console.log('\n=== ゲーム終了 ===');
    console.log(`勝者: ${winner.name} (HP: ${winner.health})`);
    const loser = this.game.getPlayers().find(p => p !== winner)!;
    console.log(`敗者: ${loser.name} (HP: ${loser.health})`);
  }

  private async playTurn(): Promise<void> {
    const player = this.game.getActivePlayer();
    const opponent = this.game.getOpponentPlayer();
    const hand = player.hand;  
 
    console.log('\n==========================================');
    console.log(`${player.name}のターン開始 (ターン${this.game.getCurrentTurn()})`);
    this.printPlayerState(player, '自分');
    this.printPlayerState(opponent, '相手');
    
    // 手札のカードをコストが支払える限り全て使用
    for (const card of hand) {
      if (player.currentPP >= card.cost) {
        const target = this.selectTarget(card);
        console.log(`${card.name}をプレイ (コスト: ${card.cost})`);
        player.playCard(card, this.game, target);
        this.printPlayerState(player, '自分');
      }
    }

    // フォロワーで攻撃
    const followers = player.playArea.getFollowers();
    for (const follower of followers) {
      if (follower.canAttack) {
        const target = this.selectAttackTarget(opponent);
        console.log(`${follower.name}で攻撃 (攻撃力: ${follower.attack})`);
        follower.attackTarget(this.game, target);
        if (target instanceof Player) {
          console.log(`→ ${target.name}に${follower.attack}ダメージ`);
        } else {
          console.log(`→ ${target.name}と交戦`);
        }
      }
    }

    console.log('\nターン終了');
    console.log('==========================================');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  private printPlayerState(player: Player, prefix: string): void {
    console.log(`\n${prefix}の状態:`);
    console.log(`  ${player.name}: HP ${player.health}`);
    console.log(`  PP: ${player.currentPP}/${player.maxPP}`);
    console.log(`  デッキ: ${player.deck.length}枚`);
    
    console.log('  手札:');
    player.hand.forEach(card => {
      console.log(`    ・${card.name} (${card.cost}コスト)`);
    });

    console.log('  フィールド:');
    player.playArea.getFollowers().forEach((follower: FollowerCard) => {
      const status = follower.canAttack ? '【攻撃可】' : '【攻撃済】';
      console.log(`    ・${follower.name} ${follower.attack}/${follower.defense} ${status}`);
    });
  }

  private selectTarget(card: Card): any {
    // カードの種類に応じて適切なターゲットを選択する簡単なロジック
    const opponent = this.game.getOpponentPlayer();
    if (card instanceof FireballCard) {
      const enemyFollowers = opponent.playArea.getFollowers();
      return enemyFollowers.length > 0 ? enemyFollowers[0] : opponent;
    }
    return null;
  }

  private selectAttackTarget(opponent: Player): any {
    const enemyFollowers = opponent.playArea.getFollowers();
    return enemyFollowers.length > 0 ? enemyFollowers[0] : opponent;
  }

  private isGameOver(): boolean {
    return this.game.getPlayers().some(player => player.health <= 0);
  }

  private getWinner(): Player {
    return this.game.getPlayers().find(player => player.health > 0)!;
  }
} 