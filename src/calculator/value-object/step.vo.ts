export class Step {
  readonly x: number;
  readonly y: number;
  readonly action: string;

  constructor(x: number, y: number, action: string) {
    this.x = x;
    this.y = y;
    this.action = action;
  }
}
