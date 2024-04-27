import { Capacity } from './value-object/capacity.vo';
import { StepsCalculator } from './service';
import { InMemoryCacheProvider } from './provider/in-memory-cache.provider';

describe('steps calculator', () => {
  let calculator = new StepsCalculator(new InMemoryCacheProvider());

  it('should find the correct steps to reach target 4 with capacity 2 and 10', async () => {
    const steps = await calculator.calculate(
      Capacity.fromNumber(2),
      Capacity.fromNumber(10),
      Capacity.fromNumber(4),
    );
    const expectedActions = [
      StepsCalculator.ACTIONS.FILL_X,
      StepsCalculator.ACTIONS.TRANSFER_XY,
      StepsCalculator.ACTIONS.FILL_X,
      StepsCalculator.ACTIONS.TRANSFER_XY,
    ];

    const actions = steps.map((step) => step.action);
    expect(actions).toEqual(expectedActions);
  });

  it('should find the correct steps to reach target 96 with capacity 2 and 100', async () => {
    const steps = await calculator.calculate(
      Capacity.fromNumber(2),
      Capacity.fromNumber(100),
      Capacity.fromNumber(96),
    );
    const expectedActions = [
      StepsCalculator.ACTIONS.FILL_Y,
      StepsCalculator.ACTIONS.TRANSFER_YX,
      StepsCalculator.ACTIONS.EMPTY_X,
      StepsCalculator.ACTIONS.TRANSFER_YX,
    ];

    const actions = steps.map((step) => step.action);
    expect(actions).toEqual(expectedActions);
  });

  it('should return empty steps if target is not reachable', async () => {
    expect(
      (
        await calculator.calculate(
          Capacity.fromNumber(2),
          Capacity.fromNumber(6),
          Capacity.fromNumber(5),
        )
      ).length,
    ).toBe(0);
    expect(
      (
        await calculator.calculate(
          Capacity.fromNumber(35),
          Capacity.fromNumber(45),
          Capacity.fromNumber(55),
        )
      ).length,
    ).toBe(0);
  });
});
