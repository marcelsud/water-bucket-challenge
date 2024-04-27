import { Capacity } from './capacity.vo';

describe('capacity value object', () => {
  it('should only accept integer values', () => {
    expect(() => Capacity.fromNumber(2.5)).toThrow();
    expect(() => Capacity.fromNumber('0.5' as any)).toThrow();
    expect(() => Capacity.fromNumber(NaN)).toThrow();
    expect(() => Capacity.fromNumber(Infinity)).toThrow();
    expect(() => Capacity.fromNumber(-Infinity)).toThrow();
    expect(() => Capacity.fromNumber(-2)).not.toThrow();
  });
});
