import { Body, Controller, Get, Post } from '@nestjs/common';
import { StepsCalculator } from './service';
import { CalculateStepsRequestDto } from './dto/calculate-steps-request.dto';
import { CalculateStepsResponseDto } from './dto/calculate-steps-response.dto';
import { Capacity } from './value-object/capacity.vo';

@Controller()
export class StepsController {
  constructor(private readonly calculator: StepsCalculator) {}

  @Post('calculate-steps')
  calculate(@Body() dto: CalculateStepsRequestDto): CalculateStepsResponseDto {
    const steps = this.calculator.calculate(
      Capacity.fromNumber(dto.x_capacity),
      Capacity.fromNumber(dto.y_capacity),
      Capacity.fromNumber(dto.z_amount_wanted),
    );

    return CalculateStepsResponseDto.fromSteps(steps);
  }
}
