import { IsInt, IsPositive } from 'class-validator';

export class CalculateStepsRequestDto {
  @IsInt()
  @IsPositive()
  x_capacity: number;

  @IsInt()
  @IsPositive()
  y_capacity: number;

  @IsInt()
  @IsPositive()
  z_amount_wanted: number;
}
