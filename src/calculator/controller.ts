import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { StepsCalculator } from './service';
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
      const steps = await this.calculator.calculate(
        Capacity.fromNumber(dto.x_capacity),
        Capacity.fromNumber(dto.y_capacity),
        Capacity.fromNumber(dto.z_amount_wanted),
      );

      return CalculateStepsResponseDto.fromSteps(steps);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
