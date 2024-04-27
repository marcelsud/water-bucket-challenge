export class Capacity {
  private _value: number;

  constructor(value: number) {
    if (Number.isInteger(value) === false) {
      throw new Error('The capacity should be an integer number');
    }
    this._value = value;
  }

  get value(): number {
    return this._value;
  }

  equals(capacity: Capacity): boolean {
    return this._value === capacity.value;
  }

  static fromNumber(value: number): Capacity {
    return new Capacity(value);
  }
}
