import { Capacity } from './capacity.vo';

export class State {
  readonly x: Capacity;
  readonly y: Capacity;
  readonly previous: State | null;
  readonly action: string | null;

  constructor(
    x: Capacity,
    y: Capacity,
    previous: State | null = null,
    action: string | null = null,
  ) {
    this.x = x;
    this.y = y;
    this.previous = previous;
    this.action = action;
  }

  isTargetHit(target: Capacity): boolean {
    return this.x.equals(target) || this.y.equals(target);
  }
}
