import { DOCUMENT } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { createStorage } from '@iazlabs/secure-web-storage';
import { InMemoryStorage } from './in-memory';
import { LocalStorage } from './local';
import { SessionStorage } from './session';
import {
  DOCUMENT_LOCAL_STORAGE,
  DOCUMENT_SESSION_STORAGE,
  STORAGE_PREFIX,
  STORAGE_SECRET,
} from './tokens';
import { ModuleConfig } from './types';

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
      ],
    };
  }
}