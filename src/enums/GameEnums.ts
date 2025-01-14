export enum CardType {
  FOLLOWER = 'FOLLOWER',
  AMULET = 'AMULET',
  SPELL = 'SPELL'
}

export enum CharacterClass {
  NEUTRAL = 'NEUTRAL',
  FOREST = 'FOREST',
  SWORD = 'SWORD',
  RUNE = 'RUNE',
  DRAGON = 'DRAGON',
  SHADOW = 'SHADOW',
  BLOOD = 'BLOOD',
  HAVEN = 'HAVEN',
  PORTAL = 'PORTAL'
}

export enum EffectType {
  DAMAGE = 'DAMAGE',
  HEAL = 'HEAL',
  DRAW = 'DRAW',
  BUFF_ATTACK = 'BUFF_ATTACK',
  BUFF_DEFENSE = 'BUFF_DEFENSE',
  EVOLVE = 'EVOLVE',
  BANISH = 'BANISH',
  // ... 他のエフェクト
}

export enum EffectTiming {
  ON_PLAY = 'ON_PLAY',
  ON_ATTACK = 'ON_ATTACK',
  ON_DEATH = 'ON_DEATH',
  END_OF_TURN = 'END_OF_TURN',
  START_OF_TURN = 'START_OF_TURN'
}

export enum Rarity {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  LEGENDARY = 'LEGENDARY'
}

export enum TargetType {
  NONE = 'NONE',
  ENEMY = 'ENEMY',
  ALLY = 'ALLY',
  ENEMY_FOLLOWER = 'ENEMY_FOLLOWER',
  ALLY_FOLLOWER = 'ALLY_FOLLOWER',
  ENEMY_LEADER = 'ENEMY_LEADER',
  ALLY_LEADER = 'ALLY_LEADER',
  ALL = 'ALL'
}

export enum EffectCondition {
  NONE = 'NONE',
  VENGEANCE = 'VENGEANCE',
  RESONANCE = 'RESONANCE',
  OVERFLOW = 'OVERFLOW',
  NECROMANCY = 'NECROMANCY',
  SPELLBOOST = 'SPELLBOOST'
} 