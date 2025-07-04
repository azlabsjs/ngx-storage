import { StorageInterface } from '@azlabsjs/secure-web-storage';

/**
 * Provide an base implementation that other storage
 * driver can use intead internal
 *
 */
// @internal
export class InternalStorage implements StorageInterface {
  // instance initializer
  constructor(private cache: Storage, private _prefix?: string) {}

  private prefix(key: string) {
    return this._prefix ? `${this._prefix}_${key}` : key;
  }

  get<T>(key: string): T | null | undefined {
    const value = this.cache.getItem(this.prefix(key));
    return typeof value === 'undefined' || value === null
      ? undefined
      : JSON.parse(value as string);
  }
  set<T>(key: string, value: T): void {
    this.cache.setItem(this.prefix(key), JSON.stringify(value));
  }
  delete(key: string): void {
    this.cache.removeItem(this.prefix(key));
  }
  clear(): void {
    this.cache.clear();
  }
}
