/*
 * Public API Surface of ngx-storage
 */
export { StorageModule } from './lib/ngx-storage.module';
export { StorageInterface, ModuleConfig } from './lib/types';
export { InMemoryStorage } from './lib/in-memory';
export { SessionStorage } from './lib/session';
export { LocalStorage } from './lib/local';
export {
  DOCUMENT_LOCAL_STORAGE,
  DOCUMENT_SESSION_STORAGE,
  DEFAULT_STORAGE,
  FAKE_STORAGE,
  IN_MEMORY_STORAGE
} from './lib/tokens';
