import { Logger, Module } from '@nestjs/common';
import { StepsController } from './calculator/controller';
import { StepsCalculator } from './calculator/service/steps-calculator.service';
import { ICacheProviderToken } from './calculator/provider/cache.provider';
import { RedisProvider } from './calculator/provider/redis.provider';
import { createClient } from 'redis';
import { CachedCalculator } from './calculator/service/cached-steps-calculator.decorator';

@Module({
  imports: [],
  controllers: [StepsController],
  providers: [
    {
      provide: ICacheProviderToken,
      useFactory: async () => {
        if (process.env.REDIS_HOST !== undefined) {
          try {
            const client = await createClient({
              url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
            }).connect();
            return new RedisProvider(client);
          } catch (e) {
            Logger.error('Error connecting to Redis', e);
            process.exit(1);
          }
        }
      },
    },
    {
      provide: StepsCalculator,
      useFactory: (cacheProvider) => {
        if (cacheProvider) {
          return new CachedCalculator(cacheProvider);
        }
        return new StepsCalculator();
      },
      inject: [ICacheProviderToken],
    },
  ],
})
export class AppModule {}
