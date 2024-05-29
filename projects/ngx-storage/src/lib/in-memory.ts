import { Inject, Injectable, Optional } from '@angular/core';
import {
  createStorage,
  InMemoryStorage as BaseInMemoryStorage,
} from '@azlabsjs/secure-web-storage';
import { InternalStorage } from './base-store';
import { STORAGE_PREFIX, STORAGE_SECRET } from './tokens';
import { StorageInterface } from './types';

/**
 * @deprecated Use `@Inject(IN_MEMORY_STORAGE)` to provide an in-memory storage instance
 */
@Injectable()
export class InMemoryStorage implements StorageInterface {
  private _internal!: StorageInterface;

  constructor(
    @Inject(STORAGE_SECRET) secret: string,
    @Optional() @Inject(STORAGE_PREFIX) prefix: string
  ) {
    this._internal = new InternalStorage(
      createStorage(new BaseInMemoryStorage(), secret),
      prefix
    );
  }

  public get<T>(key: string): T {
    return this._internal.get(key);
  }

  public set<T>(key: string, value: T) {
    this._internal.set(key, value);
  }

  public delete(key: string): void {
    this._internal.delete(key);
  }

  public clear() {
    this._internal.clear();
  }
}
