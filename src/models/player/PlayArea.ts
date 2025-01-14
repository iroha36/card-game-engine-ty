import { Card, FollowerCard } from '../card/Card';

export class PlayArea {
  private followers: FollowerCard[] = [];
  private amulets: Card[] = [];

  addFollower(card: FollowerCard): void {
    this.followers.push(card);
  }

  addAmulet(card: Card): void {
    this.amulets.push(card);
  }

  getAllCards(): Card[] {
    return [...this.followers, ...this.amulets];
  }

  getFollowers(): FollowerCard[] {
    return [...this.followers];
  }
} 