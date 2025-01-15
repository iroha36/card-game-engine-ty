import { AutoBattleService } from './application/services/AutoBattleService';

async function main() {
  console.log('カードゲーム自動対戦を開始します...');
  
  const battle = new AutoBattleService();
  
  try {
    await battle.startBattle();
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

main().catch(console.error); 