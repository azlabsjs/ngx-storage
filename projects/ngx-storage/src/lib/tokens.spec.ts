import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { createStorage, SecureWebStorage } from '@azlabsjs/secure-web-storage';
import { DOCUMENT_LOCAL_STORAGE, DOCUMENT_SESSION_STORAGE } from './tokens';

describe('Storage Tokens Tests', () => {
  let service: Storage;
  let localStorage: Storage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
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
        {
          provide: DOCUMENT_LOCAL_STORAGE,
          useFactory: (document: Document) => {
            const { defaultView } = document;
            if (!defaultView) {
              throw new Error('Browser window object is not available');
            }
            return createStorage(defaultView.localStorage, 'SECRET');
          },
          deps: [DOCUMENT],
        },
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
