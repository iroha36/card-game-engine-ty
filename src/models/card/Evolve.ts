import { FollowerCard } from './Card';

interface IEvolvable {
  canEvolve: boolean;
  evolve(): void;
}

export class EvolvableFollower extends FollowerCard implements IEvolvable {
  public canEvolve: boolean = true;
  private isEvolved: boolean = false;

  evolve(): void {
    if (this.canEvolve && !this.isEvolved) {
      this.attack += 2;
      this.defense += 2;
      this.isEvolved = true;
      // エボルブ時の特殊効果を発動
    }
  }
} 