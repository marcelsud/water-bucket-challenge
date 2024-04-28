import { Inject, Logger } from '@nestjs/common';
import {
  ICacheProvider,
  ICacheProviderToken,
} from '../provider/cache.provider';
import { StepsCalculator } from './steps-calculator.service';
import { Capacity } from '../value-object/capacity.vo';
import { Step } from '../value-object/step.vo';

export class CachedCalculator extends StepsCalculator {
  constructor(
    @Inject(ICacheProviderToken)
    private cache: ICacheProvider,
  ) {
    super();
  }

  async calculate(x: Capacity, y: Capacity, target: Capacity): Promise<Step[]> {
    Logger.debug('Calculating steps with cache');
    const cacheKey = this.generateCacheKey(x, y, target);
    const cachedSteps: string = await this.cache.get(cacheKey);

    if (cachedSteps) {
      Logger.debug('Cache Hit');
      return this.deserializeSteps(cachedSteps);
    }

    Logger.debug('Cache Miss');
    const steps = await super.calculate(x, y, target);
    await this.cache.set(cacheKey, this.serializeSteps(steps));

    return steps;
  }

  // Generate a unique key for the cache
  private generateCacheKey(x: Capacity, y: Capacity, target: Capacity): string {
    return `${x.value}-${y.value}-${target.value}`;
  }

  // Serialize the steps
  private serializeSteps(steps: Step[]): string {
    return JSON.stringify(steps);
  }

  // Deserialize the steps
  private deserializeSteps(serializedSteps: string): Step[] {
    const data = JSON.parse(serializedSteps);
    return Array.from(data).map(
      (step: any) => new Step(step.x, step.y, step.action),
    );
  }
}
