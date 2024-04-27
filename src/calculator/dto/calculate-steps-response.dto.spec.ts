import { StepsCalculator } from '../service';
import { Capacity } from '../value-object/capacity.vo';
import { Step } from '../value-object/step.vo';
import { CalculateStepsResponseDto } from './calculate-steps-response.dto';

/*import { Step } from '../value-object/step.vo';

class StepDto {
  step: number;
  bucketX: number;
  bucketY: number;
  action: string;
  status?: string;
}

export class CalculateStepsResponseDto {
  solution: StepDto[] | 'No Solution';

  constructor(solution: StepDto[] | 'No Solution') {
    this.solution = solution;
  }

  static fromSteps(steps: Step[]) {
    if (steps.length === 0) {
      return new CalculateStepsResponseDto('No Solution');
    }

    return new CalculateStepsResponseDto(
      steps.map((step, index) => ({
        step: index + 1,
        bucketX: step.x.value,
        bucketY: step.y.value,
        action: step.action,
        status: index === steps.length - 1 ? 'Solved' : undefined,
      })),
    );
  }
}

*/
describe('calculate steps response dto', () => {
  it('should create a dto with no solution', () => {
    const dto = CalculateStepsResponseDto.fromSteps([]);
    expect(dto.solution).toBe('No Solution');
  });

  it('should create a dto with a solution', () => {
    const dto = CalculateStepsResponseDto.fromSteps([
      new Step(
        Capacity.fromNumber(2),
        Capacity.fromNumber(0),
        null,
        StepsCalculator.ACTIONS.FILL_X,
      ),
      new Step(
        Capacity.fromNumber(0),
        Capacity.fromNumber(2),
        null,
        StepsCalculator.ACTIONS.TRANSFER_XY,
      ),
      new Step(
        Capacity.fromNumber(2),
        Capacity.fromNumber(2),
        null,
        StepsCalculator.ACTIONS.FILL_X,
      ),
      new Step(
        Capacity.fromNumber(0),
        Capacity.fromNumber(4),
        null,
        StepsCalculator.ACTIONS.TRANSFER_XY,
      ),
    ]);
    expect(dto.solution).toEqual([
      {
        step: 1,
        bucketX: 2,
        bucketY: 0,
        action: StepsCalculator.ACTIONS.FILL_X,
      },
      {
        step: 2,
        bucketX: 0,
        bucketY: 2,
        action: StepsCalculator.ACTIONS.TRANSFER_XY,
      },
      {
        step: 3,
        bucketX: 2,
        bucketY: 2,
        action: StepsCalculator.ACTIONS.FILL_X,
      },
      {
        step: 4,
        bucketX: 0,
        bucketY: 4,
        action: StepsCalculator.ACTIONS.TRANSFER_XY,
        status: 'Solved',
      },
    ]);
  });
});
