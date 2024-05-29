import { TestBed } from '@angular/core/testing';
import { SessionStorage } from './session';
import { DOCUMENT_SESSION_STORAGE } from './tokens';
import { StorageInterface } from './types';
import { provideSessionStorage } from './providers';

describe('SessionStorage Tests', () => {
  let service: StorageInterface;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideSessionStorage('SECRET'),
        {
          provide: SessionStorage,
          useFactory: (cache: Storage) => {
            return new SessionStorage(cache, 'prefix');
          },
          deps: [DOCUMENT_SESSION_STORAGE],
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
