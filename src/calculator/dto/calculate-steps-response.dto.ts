import { Step } from '../value-object/step.vo';

type StepDto = {
  step: number;
  bucketX: number;
  bucketY: number;
  action: string;
  status?: string;
};

const SOLVED_MESSAGE = 'Solved';

export class CalculateStepsResponseDto {
  solution: StepDto[];

  constructor(solution: StepDto[]) {
    this.solution = solution;
  }

  static fromSteps(steps: Step[]) {
    return new CalculateStepsResponseDto(
      steps.map((step, index) => ({
        step: index + 1,
        bucketX: step.x.value,
        bucketY: step.y.value,
        action: step.action,
        status: index === steps.length - 1 ? SOLVED_MESSAGE : undefined,
      })),
    );
  }
}
