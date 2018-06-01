![generator-ng5-library](https://cloud.githubusercontent.com/assets/1859381/24447242/901c8a1a-1470-11e7-8b55-2484b7825722.jpg)
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

[Yeoman](http://yeoman.io) generator to create a standalone [Angular](https://angular.io/) library in seconds.

# IMPORTANT [TS]

**There were some issues with deps versions, so I made some updates.
Now the package works with NodeJS >= v6.14.2**

If you want to create an Angular library with directives, services and/or pipes, then this generator is just what you need.

This generator aligns with the [official Angular Package Format](https://goo.gl/AMOU5G) and automatically generates a [Flat ES Module](http://angularjs.blogspot.be/2017/03/angular-400-now-available.html), a UMD bundle, a single metadata.json and type definitions to make your library ready for AOT compilation by the consuming Angular application.

Watch [Jason Aden's talk](https://www.youtube.com/watch?v=unICbsPGFIA) to learn more about the Angular Package Format.

More specifically, the latest version of this generator:

- supports Angular 5 and 6
- creates and configures `package.json` for the development of your library
- creates and configures a second `package.json` for the distribution of your library
- creates and configures `tsconfig.json` for your editor during development
- creates and configures `tslint.json` for linting purposes
- creates and configures `.gitignore`, `.npmignore` and `.travis.yml`
- creates the main library file, a sample directive, a sample component, a sample service and a sample pipe
- configures [tslint](https://palantir.github.io/tslint/) for you with [codelyzer](https://github.com/mgechev/codelyzer) support
- creates and configures build scripts to generate a Flat ES Module (FESM), type definitions and metadata files for your library to make it ready for AOT compilation
- creates and configures build scripts to generate a Universal Module Definition (UMD) bundle to use your library in Node.js, SystemJS and with script tags (Plunker, Fiddle, etc)
- inlines templates automatically for you so you can use external HTML templates
- inlines styles automatically for you so you can use external CSS templates
- supports .scss files
- supports unit tests and code coverage using [jest](https://facebook.github.io/jest/)

This generator is built for Angular version 2 and above, hence the name generator-angular2-library. If you are looking for a similar generator for AngularJS 1.x, please visit [generator-angularjs-library](https://github.com/jvandemo/generator-angularjs-library).

## Quick start

![generator-ng5-library-v12](https://cloud.githubusercontent.com/assets/1859381/25838669/89e03f04-3494-11e7-8a45-1daea0ecab1e.gif)

First, install [Yeoman](http://yeoman.io) and generator-ng5-library using [npm](https://www.npmjs.com/) (assuming you already have [node.js](https://nodejs.org/) pre-installed).

```bash
$ npm install -g yo
$ npm install -g generator-ng5-library
```

make a new directory and `cd` into it:

```bash
$ mkdir angular-library-name
$ cd angular-library-name
```

and generate your new library:

```bash
$ yo ng5-library
```

The generator will prompt you for:

```bash
? Your full name: Tony Samperi
? Your email address: github@tonysamperi.it
? Your library name (kebab case): angular-lib-name
? Git repository url: https://github.com/your-name/angular-lib-name
```

and create the following files for you:

```bash
.
├── README.MD
├── gulpfile.js
├── package.json
├── src
│   ├── index.ts
│   ├── package.json
│   ├── sample.component.ts
│   ├── sample.directive.ts
│   ├── sample.pipe.ts
│   ├── sample.service.ts
│   └── tsconfig.es5.json
├── tsconfig.json
└── tslint.json
```

You can then add or edit `*.ts` files in the `src/` directory and run:

```bash
$ npm run build
```

to automatically create all `*.js`, `*.d.ts` and `*.metadata.json` files in the `dist` directory:

```bash
dist
├── index.d.ts                  # Typings for AOT compilation
├── index.js                    # Flat ES Module (FESM) for use with webpack
├── lib.d.ts                    # Typings for AOT compilation
├── lib.metadata.json           # Metadata for AOT compilation
├── lib.umd.js                  # UMD bundle for use with Node.js, SystemJS or script tag
├── package.json                # package.json for consumer of your library
├── sample.component.d.ts       # Typings for AOT compilation
├── sample.directive.d.ts       # Typings for AOT compilation
├── sample.pipe.d.ts            # Typings for AOT compilation
└── sample.service.d.ts         # Typings for AOT compilation
```

Finally you publish your library to NPM by publishing the contents of the `dist` directory:

```bash
$ npm publish dist
```

## TypeScript config

The generator creates 2 TypeScript config files:

- `tsconfig.json` is used to configure your editor during development and is not used for building your library
- `src/tsconfig.es5.json` is used by the Angular compiler to build the files in the `dist` directory when you run `npm run build`

## Linting your code

Your library comes pre-configured with tslint and codelyzer support. To lint your code:

```bash
$ npm run lint
```

## Building your library

From the root of your library directory, run:

```bash
$ npm run build
```

This will generate a `dist` directory with:

- a `package.json` file specifically for distribution with Angular listed in the `peerDependencies`
- `sample-library.js`: a Flat ES Module (FESM) file that contains all your library code in a single file
- `sample-library.umd.js`: a Universal Module Definition (UMD) bundle file that contains all your library code in UMD format for use in Node.js, SystemJS or via a script tag (e.g. in Plunker, Fiddle, etc)
- `*.d.ts`: type definitions for you library
- `sample-library.metadata.json`: metadata for your library to support AOT compilation 

## Generating documentation for your library

From the root of your library directory, run:

```bash
$ npm run docs:build
```
This will generate a `docs` directory with all documentation of your library.

To serve your documentation, run:

```bash
$ npm run docs:serve
```

and navigate your browser to `http://localhost:8080`.

To automatically rebuild your documentation every time a file in the `src` directory changes, run:

```bash
$ npm run docs:watch
```
 
For more features, check out the [compodoc website](https://compodoc.github.io/website/).

## Publishing your library to NPM

To publish your library to NPM, first generate the `dist` directory:

```bash
$ npm run build
```

and then publish the contents of the `dist` directory to NPM:

```bash
$ npm publish dist
```

## Consuming your library

Once you have published your library to the NPM registry, you can import it in any Angular application by first installing it using NPM:

```bash
$ npm install sample-library # use the name you used to publish to npm
```

and then importing your library in your Angular `AppModule` (or whatever module you wish to import your library into):

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { SampleModule } from 'sample-library';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    
    // Specify your library as an import
    SampleModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your shared library is imported, you can use its components, directives and pipes in your Angular application templates:

```xml
<!-- app.component.html -->
<h1>{{ title }}</h1>
<sample-component>
  This component is part of the shared library and will now work as expected.
</sample-component>
```

and if you need to access a service from your shared library, you can inject it using Dependency Injection:

```typescript
import { Component } from '@angular/core';

// Import the shared service
import { SampleService } from 'sample-library';

@Component({
  template: 'Injecting a service from the shared library'
})
export class HomeComponent {

  // Inject the service using Angular DI 
  constructor(private sampleService: SampleService){
  
  }

}
```

To learn more about Angular Dependency Injection, check out the [Official Angular Documentation](https://angular.io/docs/ts/latest/cookbook/dependency-injection.html).

## Preview your library during development

To preview your library code during development, start the playground:

```bash
$ npm run playground
```

Changes to your library code will be updated live in the browser window:

![playground](https://user-images.githubusercontent.com/1859381/30514111-576fcf4e-9b0f-11e7-837d-169d08667c2c.gif)

## Consuming your library in a local application during development

To consume your library in a local application before you publish it to npm, you can follow the following steps:

1. Create your library:
  ```
  $ yo angular2-library
  ```
  Let's assume you name your library `sample-library`.
  
2. Navigate to the `sample-library` directory:
  ```
  $ cd sample-library
  ```
  
3. Compile your library files:
  ```
  $ npm run build
  ```
  
4. From the `sample-library/dist` directory, create a symlink in the global node_modules directory to the `dist` directory of your library:
  ```
  $ cd dist
  $ npm link
  ```
  
5. Create a new Angular app. Let's assume you use angular-cli:
  ```
  $ cd /your-projects-path
  $ ng new my-app
  ```
  
6. Navigate to the `my-app` directory:
  ```
  $ cd my-app
  ``` 
  
7. From the `my-app` directory, link the global `sample-library` directory to node_modules of the `my-app` directory:
  ```
  $ npm link sample-library
  ```
  
8. Import `SampleModule` in your Angular application:

  ```typescript
  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  
  import { AppComponent } from './app.component';
  
  // Import your library
  import { SampleModule } from 'sample-library';
  
  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      
      // Specify your library as an import
      SampleModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  ```

9. Once your shared library is imported, you can use its components, directives and pipes in your Angular application templates:

  ```xml
  <!-- app.component.html -->
  <h1>{{ title }}</h1>
  <sample-component>
    This component is part of the shared library and will now work as expected.
  </sample-component>
  ```
  
  and if you need to access a service from your shared library, you can inject it using Dependency Injection:
  
  ```typescript
  import { Component } from '@angular/core';
  
  // Import the shared service
  import { SampleService } from 'sample-library';
  
  @Component({
    template: 'Injecting a service from the shared library'
  })
  export class HomeComponent {
  
    // Inject the service using Angular DI 
    constructor(private sampleService: SampleService){
    
    }
  
  }
  ```
  
10. When you make a change to your library, recompile your library files again from your `sample-library` directory:
  ```
  $ npm run build
  ```
    
11. If you want to automatically recompile the library files when a file in `src` changes, run
  ```
  $ npm run build:watch
  ```
  
12. If you are using an Angular CLI application to consume your library, make sure to set up a [path mapping](https://github.com/angular/angular-cli/wiki/stories-linked-library#use-typesscript-path-mapping-for-peer-dependencies) in `/src/tsconfig.app.json` of your consuming application (not your library):
  ```typescript
  {
    "compilerOptions": {
      // ...
      // Note: these paths are relative to `baseUrl` path.
      "paths": {
        "@angular/*": [
          "../node_modules/@angular/*"
        ]
      }
    }
  }
  ```
  
When you npm link a library with peer dependencies, the [consuming application searches for the peer dependencies in the library's parent directories instead of the application's parent directories](http://codetunnel.io/you-can-finally-npm-link-packages-that-contain-peer-dependencies).

If you get `Error: Unexpected value '[object Object]' imported by the module 'AppModule'. Please add a @NgModule annotation.`, then try:

```
$ ng serve --preserve-symlinks
```

to make sure the consuming application searches for the peer dependencies in the application's node_modules directory.  
   
## Frequently asked questions

#### How can I configure Karma?

Currently, the generator does not create a custom Karma configuration for running unit tests.

If your library requires a custom Karma setup, please check out [this tutorial on how to configure Karma for your library](https://github.com/raphael-volt/ng2-testable-lib) (Credits to [Raphael](https://github.com/raphael-volt)).

As soon as official recommendations are available on how to set up Karma for testing libraries, this generator will be updated accordingly.

#### How can I use a scoped package name?

First update the package name in `src/package.json`:

```javascript
"name": "@scope/library-name"
```

and then also update `flatModuleId` in `src/tsconfig.es5.json` accordingly:

```javascript
"flatModuleId": "@scope/library-name"
```

See [#75](https://github.com/jvandemo/generator-angular2-library/issues/75) for more information.

#### How can I avoid recompilation during development

If you experience issues ([#72](https://github.com/jvandemo/generator-angular2-library/issues/72)) or want to avoid constant recompilation of your library during development, you can also `npm link src` instead of `npm link dist` in step 4 of the process above.
 
This will let you consume the TypeScript code directly from the `src` directory of your library instead of the generated bundle from the `dist` directory. This increases development speed if you are testing your library in a local Angular application, but remember to test the generated bundle using `npm link dist` after you finish writing your code, to ensure that your generated bundle is working as expected before you publish your library to NPM.

#### How can I use .scss files?

Simply store your styles in a file with a filename extension of `scss` and reference it in your component's `styleUrls` property.

So if you have a `sample.component.scss`:

```scss
h1 {
  color: red;
}
```
 
then reference it in your component's `styleUrls` in `sample.component.ts` accordingly:

```typescript
@Component({
  selector: 'sample-component',
  template: `<h1>Sample component</h1>`,
  styleUrls: [
    'sample.component.scss'
  ]
})
```

The .scss files will automatically be compiled and inlined in your library bundle.

#### How can I import .scss files

To import a .scss file in an existing .scss file, you can specify a relative path:

```
@import '../relative/path/to/other.scss';
```

or use a tilde to import a file from the nearest parent `node_modules` directory:

```
@import '~@angular/material/prebuilt-themes/deeppurple-amber.css';
```

#### How can I see which version of the generator I have installed

From the command line, run:

```
$ npm ls -g --depth=1 2>/dev/null | grep generator-
```

#### How can I update my generator to the latest version?

From the command line, run

```bash
$ yo
```
and select the option *Update your generators*.

#### What if my library depends on a third party library?

If your library depends on a third party library such as Angular Material or PrimeNG, you don't have to include the third party library in your library.

Instead, you should add the third party library as a peer dependency to the `peerDependencies` property in `src/package.json` of your library:

```javascript
"peerDependencies": {
  "@angular/core": "^4.0.0",
  "rxjs": "^5.1.0",
  "zone.js": "^0.8.4"
}
```

This causes a warning to be displayed when the consuming application runs `npm install` and does not have the third party library installed that your library depends on.

The generator already adds `@angular/core`, `rxjs` and `zone.js` as peer dependencies for you by default.

Consider the following scenario where your library depends on a third party library called "PrimeNG".

In your Angular library:

1. run `npm install primeng --save` to install PrimeNG and add it as a devDependency to `package.json` in the root directory
2. add PrimeNG as a peerDependency in `src/package.json`, *NOT* as dependency or devDependency (`src/package.json` is the package.json that is distributed with your library, so you must specify primeng as peer dependency here, *NOT* in the package.json file in the root of your library)
3. import the necessary PrimeNG Angular module(s) in your library Angular module
4. write code that uses PrimeNG components
5. build your library and publish it (or link it locally)

In the consuming Angular application

1. run `npm install yourlibrary` to install your library (which should display a warning if PrimeNG is not installed) or link it locally
2. run `npm install primeng` to install PrimeNG if it is not installed yet
3. import the necessary PrimeNG Angular module(s) in your Angular application module (usually `AppModule`) (this step is not needed if your library exports the PrimeNG module(s) in its module metadata)
4. import your library module in your Angular application module (usually `AppModule`)
5. you can now use your library components

To see a fully documented example, check out [this guide](./guides/import_non_angular_libraries.md).

#### How can I upgrade my library to support Angular 5

Version 12 or later of this generator supports Angular 5.

If you have an existing library that was generated with an earlier version of this generator:

1. update the versions of the Angular packages in `package.json` to Angular 5 ([example](https://github.com/jvandemo/generator-angular2-library/blob/master/generators/app/templates/_package.json))
2. replace the `ngc` script in your `gulpfile.js` with:

```
gulp.task('ngc', function () {
  ngc([ '--project', `${tmpFolder}/tsconfig.es5.json` ]);
  return Promise.resolve()
});
```

See [#230](https://github.com/jvandemo/generator-angular2-library/issues/230) for more information.

## Issues

Please report bugs and issues [here](https://github.com/tonysamperi/generator-ng5-library/issues).

## Development

To run the generator unit tests:

```bash
$ npm run test
```

## License

MIT © [Tony Samperi](http://tonysamperi.github.io)

## Change log

### v12.4.2

- Added support for double quotes in 'templateUrl'

### v12.4.1

- Fix tslint rule [#286](https://github.com/jvandemo/generator-angular2-library/pull/286) (Credits to [Mathias Wittlock](https://github.com/wittlock))

### v12.4.0

- Add prompt to ask for scope [#283](https://github.com/jvandemo/generator-angular2-library/pull/283) (Credits to [Fabrizio Fortunato](https://github.com/izifortune))

### v12.3.0

- Update rollup options [#270](https://github.com/jvandemo/generator-angular2-library/pull/270) (Credits to [Zura Gabievi](https://github.com/zgabievi))
- Fix mkdir error [#269](https://github.com/jvandemo/generator-angular2-library/pull/269) (Credits to [Louis Amstutz](https://github.com/lamstutz))

### v12.2.1

- Update system.js config to use single quotes

### v12.2.0

- Added default extension to playground system.js config to fix [#146](https://github.com/jvandemo/generator-angular2-library/pull/146)

### v12.1.0

- Fixed issue with deleting .tmp folder after failed build (See [#261](https://github.com/jvandemo/generator-angular2-library/pull/261)) (Credits to [Fabrizio Fortunato](https://github.com/izifortune))
- Updated package_jest.json (See [#267](https://github.com/jvandemo/generator-angular2-library/pull/267)) (Credits to [Fabrizio Fortunato](https://github.com/izifortune))

### v12.0.0

- Updated packages to Angular 5
- Updated ngc gulp script (See [#230](https://github.com/jvandemo/generator-angular2-library/issues/230)) (Credits to [Filip Lauc](https://github.com/flauc))

### v11.4.0

- Updated rollup and gulp-rollup configuration (See [#190](https://github.com/jvandemo/generator-angular2-library/pull/190)) (Credits to [Daniel Geri](https://github.com/danielgeri))

### v11.3.0

- Added playground (See [#146](https://github.com/jvandemo/generator-angular2-library/pull/146)) (Credits to [Fabrizio Fortunato](https://github.com/izifortune))

### v11.2.0

- Added guide on how depend on third party library (See [#172](https://github.com/jvandemo/generator-angular2-library/pull/172)) (Credits to [Ka Tam](https://github.com/kktam))

### v11.1.0

- Added `main` and `jsnext:main` properties to package.json

### v11.0.3

- Added FAQ on how to add third party library
- Updated jest support (See [#91](https://github.com/jvandemo/generator-angular2-library/pull/158)) (Credits to [Fabrizio Fortunato](https://github.com/izifortune))

### v11.0.2

- Fixed package.json for [Jest](https://facebook.github.io/jest/) (Credits to [Fabrizio Fortunato](https://github.com/izifortune))

### v11.0.1

- Updated `styleUrls` to fix [#140](https://github.com/jvandemo/generator-angular2-library/issues/140)

### v11.0.0

- Added support for [Jest](https://facebook.github.io/jest/) (Credits to [Fabrizio Fortunato](https://github.com/izifortune))
- Updated Compodoc (Credits to [Artem Kuznetsov](https://github.com/artemsky))

### v10.2.2

- Avoid deletion of dist directory to prevent npm link errors (See [#91](https://github.com/jvandemo/generator-angular2-library/issues/91)) (Credits to [Filipe Silva](https://github.com/filipesilva) and [Brenden Niedermeyer](https://github.com/bniedermeyer))

### v10.2.1

- Allow real files in rollup to fix [#105](https://github.com/jvandemo/generator-angular2-library/issues/105)

### v10.2.0

- Add support for scss imports ([#100](https://github.com/jvandemo/generator-angular2-library/pull/100))(Credits to [rtrompier](https://github.com/rtrompier))

### v10.1.1

- Fix README

### v10.1.0

- Copy README to dist directory ([#85](https://github.com/jvandemo/generator-angular2-library/pull/85)) (Credits to [David](https://github.com/dbfannin))

### v10.0.0

- Added support for generating UMD bundle

### v9.3.0

- Added support for .scss files (Credits to [Thomas Deblock](https://github.com/deblockt))

### v9.2.0

- Added convenience scripts for generating documentation

### v9.1.0

- Added compodoc for generating documentation ([#76](https://github.com/jvandemo/generator-angular2-library/pull/76))
- Removed comments from TypeScript config files to allow JSON validity checks

### v9.0.0

- Added Gulp for support on Mac, Linux and Windows (Credits to [Carlos Roso](https://github.com/caroso1222))
- Added template inlining (Credits to [Filipe Silva](https://github.com/filipesilva))
- Added style inlining (Credits to [Filipe Silva](https://github.com/filipesilva))

### v8.2.1

- Updated TypeScript files in gitignore

### v8.2.0

- Added build:watch script
- Added dist folder to gitignore

### v8.1.0

- Remove prepublish script

### v8.0.0

- Update build process
- Add support for AOT compilation

### v7.0.0

- Update to Angular 4

### v6.0.0

- Update to Yeoman 1.x

### v5.6.0

- Ignore files generated by ngc in .gitignore

### v5.5.2

- Remove obsolete files in package.json

### v5.5.1

- Add README.md to package.json so NPM registry can display it

### v5.5.0

- Update devDependencies

### v5.4.0

- Update to latest tslint and codelyzer

### v5.3.0

- Update TypeScript version to fix #41

### v5.2.1

- Fix eslint errors
- Remove duplicate dependency

### v5.2.0

- Suggest better default library name

### v5.1.0

- Add support for AOT compilation
- Update Angular 2 references to just Angular

### v5.0.0

- Replace typings with @types (#29)

### v4.0.0

- Remove default keyword when exporting module to fix #23

### v3.0.4

- Updated version of Codelyzer
- Updated selector of sample component to kebab case to fix #21

### v3.0.3

- Fixed unit tests

### v3.0.2

- Fixed `README.md` example code

### v3.0.1

- Fixed `tsconfig.json` files

### v3.0.0

- Added support for `NgModule`

### v2.2.0

- Updated dependencies in package.json to Angular 2 final

### v2.1.0

- Updated templates to Angular 2.0.0 RC3 syntax

### v2.0.0

- Updated with file structure using `src` and `dist` directory

### v1.1.1

- Updated templates to Angular 2.0.0 RC1 syntax

### v1.1.0

- Added codelyzer support
- Added tslint support
- Added typings support

### v1.0.0

- BREAKING CHANGE: Updated to support [Angular 2.0.0-rc.1](https://github.com/angular/angular/blob/master/CHANGELOG.md#200-rc1-2016-05-03)

### v0.6.0

- Updated dependency versions

### v0.5.0

- Added `browser.d.ts` to files in `tsconfig.json` instead of using tripleslash (see #9)

### v0.4.0

- Added reference to Angular typings

### v0.3.1

- Removed explicit RxJS dependency

### v0.3.0

- Updated to Angular 2 beta

### v0.2.0

- Added documentation
- Added support for `PROVIDERS`, `DIRECTIVES` and `PIPES`

### v0.1.0

- Added documentation
- Added boilerplate scaffolding
- Initial version

[npm-image]: https://badge.fury.io/js/generator-angular2-library.svg
[npm-url]: https://npmjs.org/package/generator-angular2-library
[travis-image]: https://travis-ci.org/jvandemo/generator-angular2-library.svg?branch=master
[travis-url]: https://travis-ci.org/jvandemo/generator-angular2-library
[daviddm-image]: https://david-dm.org/jvandemo/generator-angular2-library.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jvandemo/generator-angular2-library
[coveralls-image]: https://coveralls.io/repos/jvandemo/generator-angular2-library/badge.svg
[coveralls-url]: https://coveralls.io/r/jvandemo/generator-angular2-library
