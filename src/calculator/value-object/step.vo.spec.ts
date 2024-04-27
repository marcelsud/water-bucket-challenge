import { Step } from './step.vo';
import { Capacity } from './capacity.vo';

describe('domain', () => {
  it('should define the Step class', () => {
    expect(Step).toBeDefined();
  });

  it('should create a new Step instance', () => {
    const x = Capacity.fromNumber(0);
    const y = Capacity.fromNumber(0);
    const step = new Step(x, y);
    expect(step).toBeInstanceOf(Step);
  });

  it('should create a new Step instance with x and y', () => {
    const x = Capacity.fromNumber(2);
    const y = Capacity.fromNumber(3);
    const step = new Step(x, y);
    expect(step.x).toBe(x);
    expect(step.y).toBe(y);
  });

  it('should check if the target is hit', () => {
    const step = new Step(Capacity.fromNumber(2), Capacity.fromNumber(3));
    expect(step.isTargetHit(Capacity.fromNumber(2))).toBe(true);
    expect(step.isTargetHit(Capacity.fromNumber(3))).toBe(true);
    expect(step.isTargetHit(Capacity.fromNumber(4))).toBe(false);
  });
});
