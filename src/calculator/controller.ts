import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common';
import { StepsCalculator } from './service/steps-calculator.service';
import { CalculateStepsRequestDto } from './dto/calculate-steps-request.dto';
import { CalculateStepsResponseDto } from './dto/calculate-steps-response.dto';
import { Capacity } from './value-object/capacity.vo';

@Controller()
export class StepsController {
  constructor(private readonly calculator: StepsCalculator) {}

  @Post('/api/v1/calculate-steps')
  async calculate(
    @Body() dto: CalculateStepsRequestDto,
  ): Promise<CalculateStepsResponseDto> {
    try {
      const x = Capacity.fromNumber(dto.x_capacity);
      const y = Capacity.fromNumber(dto.y_capacity);
      const target = Capacity.fromNumber(dto.z_amount_wanted);
      const steps = await this.calculator.calculate(x, y, target);

      if (steps.length === 0) {
        throw new HttpException('No Solution', HttpStatus.UNPROCESSABLE_ENTITY);
      }

      return CalculateStepsResponseDto.fromSteps(steps);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      Logger.error(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
