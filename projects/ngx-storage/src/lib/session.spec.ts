import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { createStorage } from '@iazlabs/secure-web-storage';
import { SessionStorage } from './session';
import { DOCUMENT_SESSION_STORAGE, STORAGE_PREFIX } from './tokens';
import { StorageInterface } from './types';

describe('SessionStorage Tests', () => {
  let service: StorageInterface;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        SessionStorage,
        {
          provide: STORAGE_PREFIX,
          useValue: 'prefix',
        },
        {
          provide: DOCUMENT_SESSION_STORAGE,
          useFactory: (document: Document) => {
            const { defaultView } = document;
            if (!defaultView) {
              throw new Error('Browser window object is not available');
            }
            return createStorage(defaultView.sessionStorage, 'SECRET');
          },
          deps: [DOCUMENT],
        },
      ],
    }).compileComponents();
    service = TestBed.inject(SessionStorage);
  });

  it('should add an item to the storage and expect it to be returns when call get', () => {
    service.set('key', { name: 'Alisson', grades: [10, 17, 15, 10] });
    expect(service.get('key')).toEqual({
      name: 'Alisson',
      grades: [10, 17, 15, 10],
    });
  });

  it('should returns undefined for deleted keys', () => {
    service.set('key', { name: 'Alisson', grades: [10, 17, 15, 10] });
    service.set('key1', { name: 'Robertson', grades: [11, 13, 9] });

    // Delete the key from the store
    service.delete('key1');
    expect(service.get('key1')).toEqual(undefined);
  });

  it('should returns undefined for any key if clear is called on the storage driver', () => {
    service.set('key', { name: 'Alisson', grades: [10, 17, 15, 10] });
    service.set('key1', { name: 'Robertson', grades: [11, 13, 9] });

    // Delete the key from the store
    service.clear();
    expect(service.get('key1')).toEqual(undefined);
    expect(service.get('key')).toEqual(undefined);
  });
});
