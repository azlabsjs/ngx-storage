import { Inject, Injectable, Optional } from '@angular/core';
import { InternalStorage } from './base-store';
import { DOCUMENT_LOCAL_STORAGE, STORAGE_PREFIX } from './tokens';
import { StorageInterface } from './types';

/**
 * Provides a simple API around browser {@see window.localStorage} API
 * and add a level of security on top of the internal api by encrpting
 * key -> value pair before they are cached.
 *
 * Note: It internally serialize every value before adding it to the cache
 * using javascript {@see JSON.stringify()} api.
 *
 * @example
 * import {LocalStorage} from '@iazlabs/ngx-storage';
 *
 * export class ExampleComponent {
 *  // Properties definitions
 *
 *   constructor(private storage: LocalStorage) {
 *        // Component initialization
 *   }
 *
 *   tesFunction() {
 *      // Writing to cache
 *      this.storage.set('key', 'value');
 *
 *      // Getting value from cache
 *      this.storage.get('key');
 *
 *      // Deleting value from cache
 *      this.storage.delete('key');
 *
 *      // Flushing cache
 *      this.storage.clear();
 *   }
 *
 *    // Uses the storage service
 * }
 */
@Injectable()
export class LocalStorage implements StorageInterface {
  private _internal!: StorageInterface;

  constructor(
    @Inject(DOCUMENT_LOCAL_STORAGE) cache: Storage,
    @Optional() @Inject(STORAGE_PREFIX) prefix: string
  ) {
    this._internal = new InternalStorage(cache, prefix);
  }

  public get(key: string): any {
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
