export class Unit {
  private static readonly allowedUnits = [
    'G',
    'KG',
    'ML',
    'L',
    'CUP',
    'TBSP',
    'TSP',
    'UNIT',
    'SLICE',
    'PIECE',
    'CLOVE',
    'BUNCH',
    'CAN',
    'BOTTLE',
    'PACKET',
    'STICK',
    'DASH',
    'PINCH',
    'SCOOP',
    'BAG',
    'BOX',
    'ROLL',
    'STRIP',
    'SHEET',
    'LAYER',
    'WEDGE',
    'HEAD',
    'EAR',
    'STALK',
    'SPRIG',
  ];

  constructor(private readonly value: string) {
    if (!Unit.allowedUnits.includes(value)) {
      throw new Error(`Invalid unit: ${value}`);
    }
  }
  static create(value: string): Unit {
    return new Unit(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Unit): boolean {
    return this.value === other.value;
  }
}
