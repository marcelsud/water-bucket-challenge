/*
import { Injectable } from '@nestjs/common';
import { ICacheProvider } from './provider.interface';

@Injectable()
export class InMemoryCacheProvider implements ICacheProvider {
  private cache: Map<string, any> = new Map();

  has(key: string): boolean {
    return this.cache.has(key);
  }

  get<T>(key: string): T | undefined {
    return this.cache.get(key);
  }

  set<T>(key: string, value: T): void {
    this.cache.set(key, value);
  }
}
*/

import { InMemoryCacheProvider } from './in-memory-cache.provider';

describe('in memory cache provider', () => {
  it('should cache and retrieve values', () => {
    const cacheProvider = new InMemoryCacheProvider();
    const key = 'key';
    const value = 'value';

    cacheProvider.set(key, value);

    expect(cacheProvider.get(key)).resolves.toBe(value);
  });

  it('should return undefined if key not found', () => {
    const cacheProvider = new InMemoryCacheProvider();
    const key = 'key';

    expect(cacheProvider.get(key)).resolves.toBeUndefined();
  });

  it('should return true if key exists', () => {
    const cacheProvider = new InMemoryCacheProvider();
    const key = 'key';
    const value = 'value';

    cacheProvider.set(key, value);

    expect(cacheProvider.has(key)).resolves.toBe(true);
  });

  it('should return false if key not found', () => {
    const cacheProvider = new InMemoryCacheProvider();
    const key = 'key';

    expect(cacheProvider.has(key)).resolves.toBe(false);
  });

  it('should overwrite existing value', () => {
    const cacheProvider = new InMemoryCacheProvider();
    const key = 'key';
    const value = 'value';
    const newValue = 'new value';

    cacheProvider.set(key, value);
    cacheProvider.set(key, newValue);

    expect(cacheProvider.get(key)).resolves.toBe(newValue);
  });
});
