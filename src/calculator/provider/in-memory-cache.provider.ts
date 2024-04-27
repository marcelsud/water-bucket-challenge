import { Injectable } from '@nestjs/common';
import { ICacheProvider } from './provider.interface';

@Injectable()
export class InMemoryCacheProvider implements ICacheProvider {
  private cache: Map<string, any> = new Map();

  async has(key: string): Promise<boolean> {
    return this.cache.has(key);
  }

  async get<T>(key: string): Promise<T | undefined> {
    return this.cache.get(key);
  }

  async set<T>(key: string, value: T): Promise<void> {
    this.cache.set(key, value);
  }
}
