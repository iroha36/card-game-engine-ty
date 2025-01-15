export enum CardType {
  FOLLOWER = 'FOLLOWER',
  SPELL = 'SPELL',
  AMULET = 'AMULET'
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
  BUFF = 'BUFF'
}

export enum EffectTiming {
  ON_PLAY = 'ON_PLAY',
  ON_ATTACK = 'ON_ATTACK',
  ON_DEATH = 'ON_DEATH',
  START_OF_TURN = 'START_OF_TURN',
  END_OF_TURN = 'END_OF_TURN'
}

export enum TargetType {
  PLAYER = 'PLAYER',
  FOLLOWER = 'FOLLOWER',
  ALL = 'ALL'
}

export enum Rarity {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  LEGENDARY = 'LEGENDARY'
}