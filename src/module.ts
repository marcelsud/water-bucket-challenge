import { Logger, Module } from '@nestjs/common';
import { StepsController } from './calculator/controller';
import { StepsCalculator } from './calculator/service';
import { ICacheProviderToken } from './calculator/provider/provider.interface';
import { InMemoryCacheProvider } from './calculator/provider/in-memory-cache.provider';
import { RedisProvider } from './calculator/provider/redis.provider';
import { createClient } from 'redis';

@Module({
  imports: [],
  controllers: [StepsController],
  providers: [
    {
      provide: ICacheProviderToken,
      useFactory: async () => {
        if (process.env.CACHE_PROVIDER === 'redis') {
          try {
            const client = await createClient().connect();
            return new RedisProvider(client);
          } catch (e) {
            Logger.error('Error connecting to Redis', e);
            process.exit(1);
          }
        }
        if (process.env.CACHE_PROVIDER === 'in-memory') {
          return new InMemoryCacheProvider();
        }
        throw new Error(
          'Invalid cache provider. Please set CACHE_PROVIDER to redis or in-memory.',
        );
      },
    },
    StepsCalculator,
  ],
})
export class AppModule {}
