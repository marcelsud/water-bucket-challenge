import { validate } from 'class-validator';
import { CalculateStepsRequestDto } from './calculate-steps-request.dto';

describe('calculate steps request dto', () => {
  it('should be defined', () => {
    expect(true).toBeDefined();
  });

  it('should be validated using class-validator with empty values', async () => {
    const errors = await validate(new CalculateStepsRequestDto());
    expect(errors).toHaveLength(3);
    expect(errors[0].constraints).toEqual({
      isInt: 'x_capacity must be an integer number',
      isPositive: 'x_capacity must be a positive number',
    });
    expect(errors[1].constraints).toEqual({
      isInt: 'y_capacity must be an integer number',
      isPositive: 'y_capacity must be a positive number',
    });
    expect(errors[2].constraints).toEqual({
      isInt: 'z_amount_wanted must be an integer number',
      isPositive: 'z_amount_wanted must be a positive number',
    });
  });

  it('should be validated using class-validator with negative values', async () => {
    const errors = await validate(
      Object.assign(new CalculateStepsRequestDto(), {
        x_capacity: -1,
        y_capacity: -1,
        z_amount_wanted: -1,
      }),
    );
    expect(errors).toHaveLength(3);
    expect(errors[0].constraints).toEqual({
      isPositive: 'x_capacity must be a positive number',
    });
    expect(errors[1].constraints).toEqual({
      isPositive: 'y_capacity must be a positive number',
    });
    expect(errors[2].constraints).toEqual({
      isPositive: 'z_amount_wanted must be a positive number',
    });
  });

  it('should be validated using class-validator with string values', async () => {
    const errors = await validate(
      Object.assign(new CalculateStepsRequestDto(), {
        x_capacity: '2' as any,
        y_capacity: '2' as any,
        z_amount_wanted: '4' as any,
      }),
    );
    expect(errors).toHaveLength(3);
    expect(errors[0].constraints).toEqual({
      isInt: 'x_capacity must be an integer number',
      isPositive: 'x_capacity must be a positive number',
    });
    expect(errors[1].constraints).toEqual({
      isInt: 'y_capacity must be an integer number',
      isPositive: 'y_capacity must be a positive number',
    });
    expect(errors[2].constraints).toEqual({
      isInt: 'z_amount_wanted must be an integer number',
      isPositive: 'z_amount_wanted must be a positive number',
    });
  });

  it('should be validated using class-validator with undefined values', async () => {
    const errors = await validate(
      Object.assign(new CalculateStepsRequestDto(), {
        x_capacity: undefined,
        y_capacity: undefined,
        z_amount_wanted: undefined,
      }),
    );
    expect(errors).toHaveLength(3);
    expect(errors[0].constraints).toEqual({
      isInt: 'x_capacity must be an integer number',
      isPositive: 'x_capacity must be a positive number',
    });
    expect(errors[1].constraints).toEqual({
      isInt: 'y_capacity must be an integer number',
      isPositive: 'y_capacity must be a positive number',
    });
    expect(errors[2].constraints).toEqual({
      isInt: 'z_amount_wanted must be an integer number',
      isPositive: 'z_amount_wanted must be a positive number',
    });
  });

  it('should be validated using class-validator with valid values', async () => {
    const errors = await validate(
      Object.assign(new CalculateStepsRequestDto(), {
        x_capacity: 2,
        y_capacity: 2,
        z_amount_wanted: 4,
      }),
    );
    expect(errors).toHaveLength(0);
  });
});
