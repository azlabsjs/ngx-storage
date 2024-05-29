import { DOCUMENT } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { createStorage } from '@azlabsjs/secure-web-storage';
import { InMemoryStorage } from './in-memory';
import { LocalStorage } from './local';
import { SessionStorage } from './session';
import {
  DEFAULT_STORAGE,
  DOCUMENT_LOCAL_STORAGE,
  DOCUMENT_SESSION_STORAGE,
  FAKE_STORAGE,
  STORAGE_PREFIX,
  STORAGE_SECRET,
} from './tokens';
import { ModuleConfig } from './types';

/**
 * @deprecated Use specific providers to register `storage` services
 * required for your application
 * 
 * ngx-storage library module that provides components a.k.a services
 * required to use the library effectively.
 *
 * To integrate the module in an angular application:
 *
 * @example
 * // app.module.ts
 * import {NgModule} from '@angular/core';
 * import { StorageModule } from '@azlabsjs/ngx-storage';
 *
 * // Load providers in your application root
 *
 * NgModule({
 *  // declarations, providers, etc...
 *  imports: [
 *    // Other modules
 *     StorageModule.forRoot({
 *        secret: 'SECRET',
 *        prefix: 'prefix' // Not required, include only to prefix keys before they are added to the cache
 *    })
 *  ]
 * })
 * export class AppModule {}
 */
@NgModule()
export class StorageModule {
  static forRoot(config: ModuleConfig): ModuleWithProviders<StorageModule> {
    return {
      ngModule: StorageModule,
      providers: [
        SessionStorage,
        LocalStorage,
        InMemoryStorage,
        {
          provide: STORAGE_SECRET,
          useValue: config.secret,
        },
        {
          provide: STORAGE_PREFIX,
          useValue: config.prefix ?? '',
        },
        {
          provide: DOCUMENT_SESSION_STORAGE,
          useFactory: (document: Document) => {
            const { defaultView } = document;
            if (!defaultView) {
              throw new Error('Browser window object is not available');
            }
            return createStorage(defaultView.sessionStorage, config.secret);
          },
          deps: [DOCUMENT],
        },
        {
          provide: DOCUMENT_LOCAL_STORAGE,
          useFactory: (document: Document) => {
            const { defaultView } = document;
            if (!defaultView) {
              throw new Error('Browser window object is not available');
            }
            return createStorage(defaultView.localStorage, config.secret);
          },
          deps: [DOCUMENT],
        },
        {
          provide: DEFAULT_STORAGE,
          useClass: SessionStorage,
        },
        {
          provide: FAKE_STORAGE,
          useClass: InMemoryStorage,
        },
      ],
    };
  }
}
