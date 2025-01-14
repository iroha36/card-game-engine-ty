import { AutoBattle } from './models/game/AutoBattle';

async function main() {
  console.log('カードゲーム自動対戦を開始します...');
  
  const battle = new AutoBattle();
  
  try {
    await battle.startAutoBattle();
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

main().catch(console.error);
