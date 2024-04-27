import { Inject, Injectable } from '@nestjs/common';
import { Step } from './value-object/step.vo';
import { Capacity } from './value-object/capacity.vo';
import {
  ICacheProvider,
  ICacheProviderToken,
} from './provider/provider.interface';

export type StateKey = string;

@Injectable()
export class StepsCalculator {
  constructor(
    @Inject(ICacheProviderToken)
    private cache: ICacheProvider,
  ) {}

  static ACTIONS = {
    FILL_X: 'Fill bucket X',
    FILL_Y: 'Fill bucket Y',
    EMPTY_X: 'Empty bucket X',
    EMPTY_Y: 'Empty bucket Y',
    TRANSFER_XY: 'Transfer from bucket X to bucket Y',
    TRANSFER_YX: 'Transfer from bucket Y to bucket X',
  };

  // Calculate the steps to reach the target volume
  async calculate(x: Capacity, y: Capacity, target: Capacity): Promise<Step[]> {
    const cacheKey = this.generateCacheKey(x, y, target);
    if (await this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) || [];
    }

    const visited = new Set<StateKey>();
    let queue: Step[] = [];
    let steps: Step[] = [];

    // Add the initial state to the queue
    queue.push(new Step(Capacity.fromNumber(0), Capacity.fromNumber(0)));

    // Run a BFS (Breadth-First Search) traversal to find the target volume
    while (queue.length > 0) {
      const currentState = queue.shift();

      if (!currentState) continue;

      // Check if the current state has hit the target
      if (currentState.isTargetHit(target)) {
        // Rewind to get the list of actions taken to reach the target
        const path = this.rewind(currentState);
        //steps.push(...path);
        steps = steps.concat(path);
        break;
      }

      // Check for unique states to avoid repeating operations
      const stateKey = this.generateStateKey(currentState);
      if (visited.has(stateKey)) continue;
      visited.add(stateKey);

      // Add all possible moves to the queue
      const possibleMoves = this.generatePossibleMoves(currentState, x, y);

      // Add the possible moves to the queue
      queue = queue.concat(possibleMoves);
    }

    // Cache the result
    await this.cache.set(cacheKey, steps);

    return steps;
  }

  // Generate a unique key for the state
  private generateStateKey(currentState: Step): StateKey {
    return `${currentState.x.value},${currentState.y.value}`;
  }

  // Generate a unique key for the cache
  private generateCacheKey(x: Capacity, y: Capacity, target: Capacity): string {
    return `${x.value}-${y.value}-${target.value}`;
  }

  // Generate all possible moves from the current state
  private generatePossibleMoves(currentState: Step, x: Capacity, y: Capacity) {
    return [
      new Step(x, currentState.y, currentState, StepsCalculator.ACTIONS.FILL_X),
      new Step(currentState.x, y, currentState, StepsCalculator.ACTIONS.FILL_Y),
      new Step(
        Capacity.fromNumber(0),
        currentState.y,
        currentState,
        StepsCalculator.ACTIONS.EMPTY_X,
      ),
      new Step(
        currentState.x,
        Capacity.fromNumber(0),
        currentState,
        StepsCalculator.ACTIONS.EMPTY_Y,
      ),
      new Step(
        Capacity.fromNumber(
          currentState.x.value -
            Math.min(currentState.x.value, y.value - currentState.y.value),
        ),
        Capacity.fromNumber(
          currentState.y.value +
            Math.min(currentState.x.value, y.value - currentState.y.value),
        ),
        currentState,
        StepsCalculator.ACTIONS.TRANSFER_XY,
      ),
      new Step(
        Capacity.fromNumber(
          currentState.x.value +
            Math.min(currentState.y.value, x.value - currentState.x.value),
        ),
        Capacity.fromNumber(
          currentState.y.value -
            Math.min(currentState.y.value, x.value - currentState.x.value),
        ),
        currentState,
        StepsCalculator.ACTIONS.TRANSFER_YX,
      ),
    ];
  }

  // Rewind to get the list of steps
  private rewind(currentState: Step): Step[] {
    const path: Step[] = [];
    let state: Step | null = currentState;
    while (state && state.action) {
      path.unshift(new Step(state.x, state.y, state.previous, state.action));
      state = state.previous;
    }
    return path;
  }
}
