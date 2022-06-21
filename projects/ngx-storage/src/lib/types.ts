import { StorageInterface as BaseStorageInterface } from '@azlabsjs/secure-web-storage';

export type ModuleConfig = {
  secret: string;
  prefix?: string;
};

// Provides a type that re-export secure web storage library
// storage interface
export type StorageInterface = BaseStorageInterface;
