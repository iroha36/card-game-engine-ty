export class PP {
  private constructor(private readonly value: number) {
    if (value < 0) throw new Error('PP cannot be negative');
    if (value > 10) throw new Error('PP cannot exceed 10');
  }

  static create(value: number): PP {
    return new PP(value);
  }

  get(): number {
    return this.value;
  }

  add(other: PP): PP {
    return PP.create(this.value + other.get());
  }

  subtract(other: PP): PP {
    return PP.create(this.value - other.get());
  }

  isEnough(cost: PP): boolean {
    return this.value >= cost.get();
  }
} 