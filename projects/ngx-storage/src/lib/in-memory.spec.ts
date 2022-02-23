import { TestBed } from '@angular/core/testing';
import { InMemoryStorage } from './in-memory';
import { STORAGE_SECRET } from './tokens';

describe('InMemoryStorage Tests', () => {
  let service: InMemoryStorage;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      providers: [
        InMemoryStorage,
        {
          provide: STORAGE_SECRET,
          useValue: 'SECRET'
        }
      ]
    }).compileComponents();
    service = TestBed.inject(InMemoryStorage);
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
