import { inject, InjectionToken } from '@angular/core';
import { StorageInterface } from '@iazlabs/secure-web-storage';
import { InMemoryStorage } from './in-memory';
import { SessionStorage } from './session';

// @internal
export const STORAGE_SECRET = new InjectionToken<string>(
  'SECRET KEY USED TO ENCRYPT DATA'
);

// @internal
export const STORAGE_PREFIX = new InjectionToken<string>(
  'STRING VALUE USED TO PREFIX STORAGE KEYS'
);

/**
 * Provide an abstraction around javascript platform {@see window.sessionStorage}
 * implementation with an added level of encryption for encrypting and decrypting
 * keys and values while they are added to cache
 *
 * @example
 * import {DOCUMENT_SESSION_STORAGE} from '@iazlabs/ngx-storage';
 *
 * // Inject the token in an angular component, or service
 * export class ExampleComponent {
 *
 *  constructor(@Inject(DOCUMENT_SESSION_STORAGE) storage: Storage) {
 *      // Provide initialization logic
 *  }
 *
 *  // Work with or use the session storage object
 * }
 */
export const DOCUMENT_SESSION_STORAGE = new InjectionToken<Storage>(
  'An abstraction over window.sessionStorage object'
);

/**
 * Provide an abstraction for the javascript platform {@see window.sessionStorage}
 * implementation with an added level of encryption for encrypting and decrypting
 * keys and values while they are added to cache
 *
 * @example
 * import {DOCUMENT_LOCAL_STORAGE} from '@iazlabs/ngx-storage';
 *
 * // Inject the token in an angular component, or service
 * export class ExampleComponent {
 *
 *  constructor(@Inject(DOCUMENT_LOCAL_STORAGE) storage: Storage) {
 *      // Provide initialization logic
 *  }
 *
 *  // Work with or use the session storage object
 * }
 */
export const DOCUMENT_LOCAL_STORAGE = new InjectionToken<Storage>(
  'An abstraction over window.localStorage object'
);

// TODO : TOKENIZE SERVICES
/**
 * Provide an abstraction for {@see SessionStorage} service.
 *
 * Note: It combines {@see window.sessionStorage} and an encryption provider to cache data.
 * Depening on application needs it developper can use a different provider
 *
 *
 * Note: It internally serialize every value before adding it to the cache
 * using javascript {@see JSON.stringify()} api.
 *
 * The default storage internal may change but the interface is stable enough
 *
 * @example
 * import {DEFAULT_STORAGE, StorageInterface } from '@iazlabs/ngx-storage';
 *
 * // Inject the token in an angular component, or service
 * export class ExampleComponent {
 *
 *  constructor(@Inject(DEFAULT_STORAGE) storage: StorageInterface) {
 *      // Provide initialization logic
 *  }
 *
 *  // Work with or use the session storage object
 * }
 */
export const DEFAULT_STORAGE = new InjectionToken<StorageInterface>(
  'SESSION STORAGE PROVIDER TOKEN',
  {
    providedIn: 'root',
    factory: () => {
      return inject(SessionStorage);
    },
  }
);

/**
 * Provide an abstraction for {@see SessionStorage} service.
 *
 * Note: It provides an in-memory javascript map cache provider
 *
 *
 * Note: It internally serialize every value before adding it to the cache
 * using javascript {@see JSON.stringify()} api.
 *
 *
 * @example
 * import {FAKE_STORAGE, StorageInterface } from '@iazlabs/ngx-storage';
 *
 * // Inject the token in an angular component, or service
 * export class ExampleComponent {
 *
 *  constructor(@Inject(FAKE_STORAGE) storage: StorageInterface) {
 *      // Provide initialization logic
 *  }
 *
 *  // Work with or use the session storage object
 * }
 */
 export const FAKE_STORAGE = new InjectionToken<StorageInterface>(
  'IN MEMORY STORAGE PROVIDER TOKEN',
  {
    providedIn: 'root',
    factory: () => {
      return inject(InMemoryStorage);
    },
  }
);
