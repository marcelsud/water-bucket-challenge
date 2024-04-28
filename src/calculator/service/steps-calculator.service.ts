import { Inject, Injectable } from '@nestjs/common';
import { Step } from '../value-object/step.vo';
import { Capacity } from '../value-object/capacity.vo';
import {
  ICacheProvider,
  ICacheProviderToken,
} from '../provider/cache.provider';
import { State } from '../value-object/state.vo';

export type StateKey = string;

@Injectable()
export class StepsCalculator {
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
    const visited = new Set<StateKey>();
    let queue: State[] = [];
    let steps: Step[] = [];

    // Add the initial state to the queue
    queue.push(new State(Capacity.fromNumber(0), Capacity.fromNumber(0)));

    // Run a BFS (Breadth-First Search) traversal to find the target volume
    while (queue.length > 0) {
      const entry = queue.shift();
      const currentState = new State(
        entry.x,
        entry.y,
        entry.previous,
        entry.action,
      );

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

    return steps;
  }

  // Generate all possible moves from the current state
  private generatePossibleMoves(currentState: State, x: Capacity, y: Capacity) {
    return [
      new State(
        x,
        currentState.y,
        currentState,
        StepsCalculator.ACTIONS.FILL_X,
      ),
      new State(
        currentState.x,
        y,
        currentState,
        StepsCalculator.ACTIONS.FILL_Y,
      ),
      new State(
        Capacity.fromNumber(0),
        currentState.y,
        currentState,
        StepsCalculator.ACTIONS.EMPTY_X,
      ),
      new State(
        currentState.x,
        Capacity.fromNumber(0),
        currentState,
        StepsCalculator.ACTIONS.EMPTY_Y,
      ),
      new State(
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
      new State(
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
  private rewind(currentState: State): Step[] {
    const path: Step[] = [];
    let state: State | null = currentState;
    while (state && state.action) {
      path.unshift(new Step(state.x.value, state.y.value, state.action));
      state = state.previous;
    }
    return path;
  }

  // Generate a unique key for the state
  private generateStateKey(currentState: State): StateKey {
    return `${currentState.x.value},${currentState.y.value}`;
  }
}
