# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.5.5](https://github.com/Matb85/modular-slider/compare/v0.5.4...v0.5.5) (2021-04-12)


### Bug Fixes

* :bug: counter mismatching in carousel mode ([fc353f8](https://github.com/Matb85/modular-slider/commit/fc353f8eadbb7e6e9944357743bc99667b177340))

### [0.5.4](https://github.com/Matb85/modular-slider/compare/v0.5.3...v0.5.4) (2021-03-24)


### Features

* :sparkles: add slide margin support for the width in % strategy ([b2f3921](https://github.com/Matb85/modular-slider/commit/b2f392153c0b41fb08fb19ec99ba16f5d3548fbd))


### Bug Fixes

* :lipstick: add a default value for --slide-margin ([9d26c5b](https://github.com/Matb85/modular-slider/commit/9d26c5ba744b3f7d0f4f4b69e0903d2308d00627))

### [0.5.3](///compare/v0.5.2...v0.5.3) (2021-03-23)


### Features

* :wheelchair: add a destroy method for removing listeners, DOM changes, etc 2810b98


### Bug Fixes

* :bug: no longer throws 'cannot call a class as a function ' when using with @babel/runtime 0e42294
* :bug: slideBy in the carousel mixin; buttons when clicked first b36f927

### [0.5.2](///compare/v0.5.1...v0.5.2) (2021-03-20)

### [0.5.1](///compare/v0.5.0...v0.5.1) (2021-03-19)


### Features

* :iphone: sync better with css vars => improve responsiveness eb73101

## [0.5.0](///compare/v0.4.1...v0.5.0) (2021-03-19)


### ⚠ BREAKING CHANGES

* :boom: select the container with getElementById
* :zap: move over to translate3d transforms
* :boom: use the transform and transformAbsolute methods in mixins
* :boom: rename mixins to PascalCase

### Features

* :construction: add a utilitity "transform" as a global method for transforming the container 54a3c7f


### Bug Fixes

* **plugins:** :bug: autoplay's resume and pause functions 71735f4
* :ambulance: the inheritance bug within the setup function 9f28c22
* :rotating_light: rewrite devdocs to ts & fix linter errors 4ca875c


* :boom: rename mixins to PascalCase 63c2669
* :boom: select the container with getElementById bcfd8e2
* :boom: use the transform and transformAbsolute methods in mixins c6fdac4
* :zap: move over to translate3d transforms a1d83e1

### [0.4.1](///compare/v0.4.0...v0.4.1) (2021-03-17)


### Features

* **plugins:** :sparkles: add a plugin for lazy-loading images 69133a5
* :lipstick: add support for sliders with images 598249a

## [0.4.0](///compare/v0.3.0...v0.4.0) (2021-03-17)


### ⚠ BREAKING CHANGES

* :truck: move slidehandler.ts to mixins
* :alien: allow every mixin to have an init function

### Features

* **plugins:** :children_crossing: pause autoplay when the page is hidden 93c7f49
* :alien: allow every mixin to have an init function 42dc980


### Bug Fixes

* :art: improve the structure of imports and exports 51144d5
* :bug: autoplay now can update pagination; minor refactoring 262907e


* :truck: move slidehandler.ts to mixins d057aff

## [0.3.0](///compare/v0.2.0...v0.3.0) (2021-03-16)


### ⚠ BREAKING CHANGES

* :recycle: change the entry point's structure
* :art: replace mixins with abstract classes
* :art: transform autoplay & buttons to plugins

### Features

* :art: transform autoplay & buttons to plugins 155a504


* :art: replace mixins with abstract classes cce00c3
* :recycle: change the entry point's structure 9b24d88

## [0.2.0](///compare/v0.1.0...v0.2.0) (2021-03-16)


### ⚠ BREAKING CHANGES

* :zap: rewrite to async/await/promises

### Bug Fixes

* :bug: pagination when used in carousel mode 0fb6d32
* :bug: prevbtn handler when using with noloop 78596dc


* :zap: rewrite to async/await/promises 5213716

## 0.1.0 (2021-03-15)


### ⚠ BREAKING CHANGES

* :construction: import js from the old project

### Features

* :construction: import js from the old project 94da041
* :recycle: rewrite base slider types to ts 0772a7f
* :sparkles: add scss compiler a2cf6db
* :sparkles: rewrite control, pagination and interval functionalities to ts 5d88d1f
* :tada: init 8cbd400
