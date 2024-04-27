import { Step } from '../value-object/step.vo';

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
