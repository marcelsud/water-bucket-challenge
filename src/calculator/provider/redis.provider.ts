import { ICacheProvider } from './cache.provider';
import { Injectable } from '@nestjs/common';
import { RedisJSON } from '@redis/json/dist/commands';
import {
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
  RedisScripts,
} from 'redis';

@Injectable()
export class RedisProvider implements ICacheProvider {
  constructor(
    private client: RedisClientType<
      RedisDefaultModules,
      RedisFunctions,
      RedisScripts
    >,
  ) {}

  async has(key: string): Promise<boolean> {
    const count = await this.client.exists(key);
    return count > 0;
  }

  async get<T>(key: string): Promise<T | undefined> {
    const data = await this.client.json.get(key);
    return data as T | undefined;
  }

  async set<T>(key: string, value: T): Promise<void> {
    this.client.json.set(key, '$', value as RedisJSON);
  }
}
