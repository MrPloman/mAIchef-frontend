export class StepInstruction {
  constructor(private readonly value: string) {
    if (!value || value.trim().length < 5) {
      throw new Error('Instruction must contain at least 5 characters');
    }
  }
  static create(value: string): StepInstruction {
    return new StepInstruction(value);
  }

  getValue(): string {
    return this.value;
  }
}
