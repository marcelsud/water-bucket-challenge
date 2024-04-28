import { Step } from '../value-object/step.vo';
import { StepsCalculator } from '../service/steps-calculator.service';
import { CalculateStepsResponseDto } from './calculate-steps-response.dto';

describe('calculate steps response dto', () => {
  it('should create a dto with no solution', () => {
    const dto = CalculateStepsResponseDto.fromSteps([]);
    expect(dto.solution.length).toBe(0);
  });

  it('should create a dto with a solution', () => {
    const dto = CalculateStepsResponseDto.fromSteps([
      new Step(2, 0, StepsCalculator.ACTIONS.FILL_X),
      new Step(0, 2, StepsCalculator.ACTIONS.TRANSFER_XY),
      new Step(2, 2, StepsCalculator.ACTIONS.FILL_X),
      new Step(0, 4, StepsCalculator.ACTIONS.TRANSFER_XY),
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
