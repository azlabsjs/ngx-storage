import { DOCUMENT } from '@angular/common';
import { Provider } from '@angular/core';
import {
  DOCUMENT_LOCAL_STORAGE,
  DOCUMENT_SESSION_STORAGE,
  IN_MEMORY_STORAGE,
} from './tokens';
import { InMemoryStorage, createStorage } from '@azlabsjs/secure-web-storage';

/** @description Provides a storage instance that writes changes to browser local storage */
export function provideLocalStorage(secret: string, prefix = '') {
  return {
    provide: DOCUMENT_LOCAL_STORAGE,
    useFactory: (document: Document) => {
      const { defaultView } = document;
      if (!defaultView) {
        throw new Error('Browser window object is not available');
      }
      return createStorage(defaultView.localStorage, secret, prefix);
    },
    deps: [DOCUMENT],
  };
}

/** @description Provides a storage instance that writes changes to browser session storage */
export function provideSessionStorage(secret: string, prefix = '') {
  return {
    provide: DOCUMENT_SESSION_STORAGE,
    useFactory: (document: Document) => {
      const { defaultView } = document;
      if (!defaultView) {
        throw new Error('Browser window object is not available');
      }
      return createStorage(defaultView.sessionStorage, secret, prefix);
    },
    deps: [DOCUMENT],
  } as Provider;
}

/** @description Uses an in-memory non persistent storage that saves data using javascript hash map implementation */
export function provideInMemoryStorage(secret: string, prefix = '') {
  return {
    provide: IN_MEMORY_STORAGE,
    useFactory: () => {
      return createStorage(new InMemoryStorage(), secret, prefix);
    },
  } as Provider;
}
