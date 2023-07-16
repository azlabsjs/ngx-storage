# NgxStorage

Simple but useful package providing abstraction arround Browsers various storages for angular projects and adding an encryption level using the [https://www.npmjs.com/package/crypto-es].

## Dependencies

They library is dependent on Angular core and common, crypto-es the [https://github.com/azlabsjs/secure-web-storage/packages/1266504] a.k.a secure-web-storage libraries.

| @azlabsjs/ngx-storage | Angular | @azlabsjs/secure-web-storage  |
|-----------------------|---------|-------------------------------|
| ^0.13.x               | ^13.x   | ^0.1.x                        |
| ^0.14.x               | ^15.x   | ^0.1.x                        |
| ^0.15.x               | ^15.x   | ^0.1.x                        |

## Usage

To use the package in Angular Application, developper must add module exposed by the package at the root of the project. This provide the depending project with all the services required provided by the package.

```ts
// app.module.ts
import { NgModule } from '@angular/core';
import { StorageModule } from '@azlabsjs/ngx-storage';

@NgModule({
 // declarations, providers, etc...
 imports: [
   // Other modules
    StorageModule.forRoot({
       secret: 'SECRET',
       prefix: 'prefix' // Not required, include only to prefix keys before they are added to the cache
   })
 ]
})
export class AppModule {}
```

* Using the default storage provider

By default the package uses {@see window.sessionStorage} as a default storage cache for project which is provided using angular injection token services.

Note: It internally serialize every value before adding it to the cache
using javascript {@see JSON.stringify()} api. The default storage internal implementations may change but the interface is stable enough

```ts
import { Inject, Component } from '@angular/core';
import {DEFAULT_STORAGE, StorageInterface } from '@azlabsjs/ngx-storage';

// Inject the token in an angular component, or service
@Component({
  // ...
})
export class ExampleComponent {
  constructor(@Inject(DEFAULT_STORAGE) storage: StorageInterface) {
     // Provide initialization logic
  }
 // Work with or use the session storage object

  tesFunction() {
     // Writing to cache
    this.storage.set('key', 'value');

    // Getting value from cache
    this.storage.get('key');

    // Deleting value from cache
    this.storage.delete('key');

    // Flushing cache
    this.storage.clear();
  }
}
```

* In Memory storage

The package also comes with a Javascipt {@see Map} a.k.a Hash map based in memory storage that can be used for testing purpose as it does not persist storage state.

```ts
import {FAKE_STORAGE, StorageInterface } from '@azlabsjs/ngx-storage';
// Inject the token in an angular component, or service
export class ExampleComponent {
  constructor(@Inject(FAKE_STORAGE) storage: StorageInterface) {
     // Provide initialization logic
  }
 // Work with or use the session storage object
}
```

* Direct browser API

If the developper purpose is to use to use browser {@see Storage} api but still have the encryption level ngx-storage package offer two injection token to session and local storages.

```ts
import { Inject, Component } from '@angular/core';
import {DOCUMENT_LOCAL_STORAGE, DOCUMENT_SESSION_STORAGE } from '@azlabsjs/ngx-storage';

// Inject the token in an angular component, or service
@Component({
  // ...
})
export class ExampleComponent {
  constructor(@Inject(DOCUMENT_SESSION_STORAGE) session: Storage, @Inject(DOCUMENT_LOCAL_STORAGE) local: Storage) {
     // Provide initialization logic
  }
 // Work with or use the session storage object

  tesFunction() {
     // Writing to cache
    this.storage.setItem('key', JSON.stringify());

    // Getting value from cache
    this.storage.getItem('key'); // string

    // Deleting value from cache
    this.storage.deleteItem('key');

    // Flushing cache
    this.storage.clear();
  }
}
```
