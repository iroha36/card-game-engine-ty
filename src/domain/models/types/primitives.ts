// プリミティブ型のエイリアス
export type CardId = string & { readonly _brand: unique symbol };
export type PlayerId = string & { readonly _brand: unique symbol };
export type GameId = string & { readonly _brand: unique symbol };

// ファクトリ関数
export const createCardId = (value: string): CardId => value as CardId;
export const createPlayerId = (value: string): PlayerId => value as PlayerId;
export const createGameId = (value: string): GameId => value as GameId; 