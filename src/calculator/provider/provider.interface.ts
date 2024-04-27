export interface ICacheProvider {
  has(key: string): Promise<boolean>;
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T): Promise<void>;
}

export const ICacheProviderToken = Symbol('ICacheProvider');
