import { TestBed } from '@angular/core/testing';
import { SecureWebStorage } from '@azlabsjs/secure-web-storage';
import { DOCUMENT_LOCAL_STORAGE, DOCUMENT_SESSION_STORAGE } from './tokens';
import { provideLocalStorage, provideSessionStorage } from './providers';

describe('Storage Tokens Tests', () => {
  let service: Storage;
  let localStorage: Storage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideSessionStorage('SECRET'),
        provideLocalStorage('SECRET'),
      ],
    }).compileComponents();
    service = TestBed.inject(DOCUMENT_SESSION_STORAGE);
    localStorage = TestBed.inject(DOCUMENT_LOCAL_STORAGE);
  });

  it('should return a SecureWebStorage for DOCUMENT_SESSION_STORAGE injection token', () => {
    expect(service).toBeInstanceOf(SecureWebStorage);
  });

  it('should return a SecureWebStorage for DOCUMENT_LOCAL_STORAGE injection token', () => {
    expect(localStorage).toBeInstanceOf(SecureWebStorage);
  });
});
