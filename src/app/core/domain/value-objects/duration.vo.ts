export class Duration {
  constructor(private readonly minutes: number) {
    if (!Number.isInteger(minutes) || minutes < 0) {
      throw new Error('Duration must be a positive number');
    }
  }

  getMinutes(): number {
    return this.minutes;
  }
}
