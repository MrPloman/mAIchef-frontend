export class Duration {
  private constructor(private readonly value: number) {}

  static create(value: number): Duration {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error('Duration must be positive');
    }

    return new Duration(value);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: Duration): boolean {
    return this.value === other.value;
  }
}
