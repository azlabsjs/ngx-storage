# NgxStorage

Simple but useful package providing abstraction arround Browsers various storages for angular projects and adding an encryption level using the [https://www.npmjs.com/package/crypto-es].

## Dependencies

They library is dependent on Angular core and common, crypto-es the [https://github.com/azlabsjs/secure-web-storage/packages/1266504] a.k.a secure-web-storage libraries.

| @azlabsjs/ngx-storage | Angular | @azlabsjs/secure-web-storage |
| --------------------- | ------- | ---------------------------- |
| ^0.13.x               | ^13.x   | ^0.1.x                       |
| ^0.14.x               | ^15.x   | ^0.1.x                       |
| ^0.15.x               | ^15.x   | ^0.1.x                       |
| ^0.17.x               | ^17.x   | ^0.2.3x                      |

## Usage

To use the package in Angular Application, developper must add module exposed by the package at the root of the project. This provide the depending project with all the services required provided by the package.

```ts
// app.module.ts
import { NgModule } from "@angular/core";
import { StorageModule } from "@azlabsjs/ngx-storage";

@NgModule({
  // declarations, providers, etc...
  imports: [
    // Other modules
    StorageModule.forRoot({
      secret: "SECRET",
      prefix: "prefix", // Not required, include only to prefix keys before they are added to the cache
    }),
  ],
})
export class AppModule {}
```

- Version >= 0.17.x API changes

From version 0.17.x, `StorageModule.forRoot(...)` call in your application module is marked as deprecated. We recommend you to use angular new API to register storage providers. To do so, the library provides 3 main function to register browser storage API compatible instances:

- Local storage

This API provides developper with a storage object write data securely into browser local storage.

```ts
// app.module.ts
import { NgModule } from '@angular/core';
import { provideLocalStorage } from '@azlabsjs/ngx-storage';

@NgModule({
 // declarations, etc...
 providers: [
   // Use this to provide a storage instance that internally uses browser local storage object
   provideLocalStorage(...),
 ]
})
export class AppModule {}


// To use the registered provider
// app.component.ts
import {Inject, Component} from '@angular/core';
import {DOCUMENT_LOCAL_STORAGE} from '@azlabsjs/ngx-storage';

@Component()
export class AppComponent {

  constructor(@Inject(DOCUMENT_LOCAL_STORAGE) storage: Storage) {}
}
```

- Session Storage API

This API provides developper with a storage object write data securely into browser session storage.

```ts
// app.module.ts
import { NgModule } from '@angular/core';
import { provideSessionStorage } from '@azlabsjs/ngx-storage';

@NgModule({
 // declarations, etc...
 providers: [
   // Use this to provide a storage instance that internally uses browser session storage object
   provideSessionStorage(...),
 ]
})
export class AppModule {}


// To use the registered provider
// app.component.ts
import {Inject, Component} from '@angular/core';
import {DOCUMENT_SESSION_STORAGE} from '@azlabsjs/ngx-storage';

@Component()
export class AppComponent {

  constructor(@Inject(DOCUMENT_SESSION_STORAGE) storage: Storage) {}
}
```


- In-memory Storage

```ts
// app.module.ts
import { NgModule } from '@angular/core';
import { provideInMemoryStorage } from '@azlabsjs/ngx-storage';

@NgModule({
 // declarations, etc...
 providers: [
   // Use this to provide a storage instance that internally uses a javascript hash map as storage object
   provideInMemoryStorage(...),
 ]
})
export class AppModule {}


// To use the registered provider
// app.component.ts
import {Inject, Component} from '@angular/core';
import {IN_MEMORY_STORAGE} from '@azlabsjs/ngx-storage';

@Component()
export class AppComponent {

  constructor(@Inject(IN_MEMORY_STORAGE) storage: Storage) {}
}
```
