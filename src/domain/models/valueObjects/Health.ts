export class Health {
  private constructor(private readonly value: number) {
    if (value < 0) throw new Error('Health cannot be negative');
  }

  static create(value: number): Health {
    return new Health(value);
  }

  get(): number {
    return this.value;
  }

  damage(amount: number): Health {
    return new Health(Math.max(0, this.value - amount));
  }

  heal(amount: number): Health {
    return new Health(this.value + amount);
  }

  isDead(): boolean {
    return this.value <= 0;
  }
} 