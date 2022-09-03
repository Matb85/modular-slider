# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.11.0](https://github.com/Matb85/modular-slider/compare/v0.10.0...v0.11.0) (2022-09-03)


### Bug Fixes

* :fire: fix the slideBy & goTo methods ([b41c46a](https://github.com/Matb85/modular-slider/commit/b41c46a40feaee54c8f2e8b397ab8e31073e4009))
* :label: fix TS types ([6d7d649](https://github.com/Matb85/modular-slider/commit/6d7d64912418cb41e81515cb311881b79a2ae3d0))
* :lipstick: delete unnecessary tailwind css ([85988bd](https://github.com/Matb85/modular-slider/commit/85988bd0cef6428601734170f17dc23d45e6fde2))
* **plugins:** :ambulance: ensure the usage of correct dots in the pagination slider ([efb7872](https://github.com/Matb85/modular-slider/commit/efb787252c1f516ac087e9e68b157d9b274f8449))
* **plugins:** :bug: fix the pagination plugin ([8d916bf](https://github.com/Matb85/modular-slider/commit/8d916bff0baba9418ccfd9065eb4258436594c81))


### Enhancements

* :lipstick: rename the css classes ([730d910](https://github.com/Matb85/modular-slider/commit/730d910daacec7f45150922ceef09a91ec624ac2))
* :recycle: ensure all events and classes are namespaced with the MS- prefix ([4751a47](https://github.com/Matb85/modular-slider/commit/4751a473b55f5e01a164e5ae5e709ca20fbceba0))
* :recycle: redo the Carousel plugin ([33141e1](https://github.com/Matb85/modular-slider/commit/33141e157a62c0c305868576a03c51ef6613fe55))
* :sparkles: add getCurrentSlide method ([7ae6bd4](https://github.com/Matb85/modular-slider/commit/7ae6bd4a1c44bae608120d5695dddb41405eed5d))
* **mixins:** :fire: implement getCurrentSlide & use setTimeout in the base function ([e317216](https://github.com/Matb85/modular-slider/commit/e31721691696d9051e94c7d4fe0c70433a00a727))

## [0.10.0](https://github.com/Matb85/modular-slider/compare/v0.9.0...v0.10.0) (2022-05-17)


### Bug Fixes

* :bug: fix event listeners in base.ts ([0a32931](https://github.com/Matb85/modular-slider/commit/0a329310da287f7075cacc319997f86a571dcd7e))
* :lipstick: fix list rendering issues ([e8db974](https://github.com/Matb85/modular-slider/commit/e8db9742e2d89f7d9c3fe3f8382bd5b6839d668c))


### Enhancements

* :bulb: add comments to the SlideI interface ([30f8f7d](https://github.com/Matb85/modular-slider/commit/30f8f7d426c27a976a6ea9bf7a935c6738a0a7f0))
* :recycle: prefer eventas to timeouts ([a3187f5](https://github.com/Matb85/modular-slider/commit/a3187f56dece34ca2af0cb8650726de29e7cf93a))
* :recycle: rename registerListener to addConListener & registerDocumentListener to addDocListener ([3030d25](https://github.com/Matb85/modular-slider/commit/3030d25885f646dbcd8e11662a54a2660d565708))
* :recycle: rework the destroying logic ([874f3df](https://github.com/Matb85/modular-slider/commit/874f3df9b5c54cc4190f1e016ca471b225eedcb6))
* :recycle: scope custom events ([44ffdf5](https://github.com/Matb85/modular-slider/commit/44ffdf54c3827e1b4692165db732fb2ef3dbc9f6))
* :recycle: support ms-transitionend by default in base.ts ([b2a7821](https://github.com/Matb85/modular-slider/commit/b2a78219d854bd4ba441d397c843a4ed0706d910))
* :sparkles: add EVENTS enum ([a148896](https://github.com/Matb85/modular-slider/commit/a1488960fe4b157bbb90633a5e76674d3bc05572))
* :sparkles: create a dedicated file for ts utils ([b7f3108](https://github.com/Matb85/modular-slider/commit/b7f3108ed13c9c37ed302a8e34d74be0c9cf495b))
* :sparkles: create addTempConListener utility ([8227862](https://github.com/Matb85/modular-slider/commit/8227862e55f492efabd1e74083b23f5fd1fd6d6d))
* :sparkles: create goTo method ([1317d44](https://github.com/Matb85/modular-slider/commit/1317d442afdf0a322c18bc702a84452e3e9b77c2))
* :zap: use requestAnimationFrame, refactor helperCounter & counter, fix slideTo - all in carousel.ts ([c9869e2](https://github.com/Matb85/modular-slider/commit/c9869e23932a084ca62d2fc46b0c62b8152520ee))
* **mixins:** :truck: use PascalCase for mixins ([a3b676b](https://github.com/Matb85/modular-slider/commit/a3b676b0305acce79835d7eb04283433d997c298))
* **plugins:** :sparkles: make duplicating a separate plugin ([e31fcd0](https://github.com/Matb85/modular-slider/commit/e31fcd0740da0867908a756bf99091c32dba7ed9))
* **plugins:** :zap: carousel.ts - remove DOM changes altogether ([cb6e01e](https://github.com/Matb85/modular-slider/commit/cb6e01ed76f5de0f27e76a489a9ac1d6cbd388c7))

## [0.9.0](https://github.com/Matb85/modular-slider/compare/v0.8.6...v0.9.0) (2022-05-10)


### Bug Fixes

* :label: fix types ([4369963](https://github.com/Matb85/modular-slider/commit/43699635014a3f4a9b8d140fa10cb874027b9481))
* **plugins:** :bug: fix pagination ([084d196](https://github.com/Matb85/modular-slider/commit/084d19614810c35df68cf5969f8546b629106073))


### Enhancements

* :recycle: apply the event helpers ([f0aa5a9](https://github.com/Matb85/modular-slider/commit/f0aa5a9f198fd6c6898b83ccff13c9f1d6e61a7d))
* :sparkles: add event helpers ([9405312](https://github.com/Matb85/modular-slider/commit/9405312d1875d2faa399f426f1917f185a283819))
* :zap: improve the setup function ([77805ec](https://github.com/Matb85/modular-slider/commit/77805eccfc8f8b5f89d8c2ecbd0bd6c8d09720c2))

### [0.8.6](https://github.com/Matb85/modular-slider/compare/v0.8.5...v0.8.6) (2022-05-05)


### Bug Fixes

* :label: export types ([0ed1df6](https://github.com/Matb85/modular-slider/commit/0ed1df6ed727009d19716b54282ceec04a6fb59d))

### [0.8.5](https://github.com/Matb85/modular-slider/compare/v0.8.4...v0.8.5) (2022-04-30)


### Bug Fixes

* **plugins:** :ambulance: fix carousel slideBy bugs ([d5ee65a](https://github.com/Matb85/modular-slider/commit/d5ee65a4fe23f84b9b4920dcd838effc51c2f499))

### [0.8.4](https://github.com/Matb85/modular-slider/compare/v0.8.3...v0.8.4) (2022-04-30)


### Bug Fixes

* **plugins:** :bug: fix carousel bugs ([f6a713d](https://github.com/Matb85/modular-slider/commit/f6a713deb2681c5769c9459ac1a1ebda487fcd08))

### [0.8.3](https://github.com/Matb85/modular-slider/compare/v0.8.2...v0.8.3) (2022-04-30)


### Bug Fixes

* **mixins:** :ambulance: fix slideBy in carousel.ts ([7240765](https://github.com/Matb85/modular-slider/commit/7240765d7179eb55e3a79b4d1663fe8a76c7927c))

### [0.8.2](https://github.com/Matb85/modular-slider/compare/v0.8.1...v0.8.2) (2022-04-30)


### Bug Fixes

* :bento: rename style.css to modular-slider.css ([fd5a23a](https://github.com/Matb85/modular-slider/commit/fd5a23a761a648c27e1cd8cd1d38747b9db54a17))

### [0.8.1](https://github.com/Matb85/modular-slider/compare/v0.8.0...v0.8.1) (2022-04-29)


### Bug Fixes

* :lipstick: css env bugs ([e8cfef9](https://github.com/Matb85/modular-slider/commit/e8cfef94d72da88d356741730de6dca1420a1b1a))
* **plugins:** :bug: fix slidePrev in noLoop.ts ([ffcaccf](https://github.com/Matb85/modular-slider/commit/ffcaccfd879e0ea6609169d01d13f9c52dc049a3))

## [0.8.0](https://github.com/Matb85/modular-slider/compare/v0.7.1...v0.8.0) (2022-04-29)


### Bug Fixes

* :memo: docs - fix file paths ([80b5fbe](https://github.com/Matb85/modular-slider/commit/80b5fbe07442ea1f47ba649f9bebaa579ba1f4e7))


### Enhancements

* :construction_worker: use vite for bundling ([6280ef0](https://github.com/Matb85/modular-slider/commit/6280ef0cadcb80482446830559e2d3cb5fa7eaca))
* :memo: use vite for docs ([16c57aa](https://github.com/Matb85/modular-slider/commit/16c57aab2a5f6485d94543bb0e89541e5496f0e7))
* :zap: start using the ismoving property ([c9f8fe7](https://github.com/Matb85/modular-slider/commit/c9f8fe7ee5a6430ed19704424508318c22c5fa28))
* **plugins:** :recycle: refactor autoplay.ts ([cd8f3a8](https://github.com/Matb85/modular-slider/commit/cd8f3a8dbbfcd2be415533cb00190731fabcec00))

### [0.7.1](https://github.com/Matb85/modular-slider/compare/v0.7.0...v0.7.1) (2022-02-14)


### Enhancements

* :mute: remove logs in production ([b83fe62](https://github.com/Matb85/modular-slider/commit/b83fe627928742b62ee9753aa301f05fb5f84e0a))

## [0.7.0](https://github.com/Matb85/modular-slider/compare/v0.6.4...v0.7.0) (2022-02-08)


### ⚠ BREAKING CHANGES

* **plugins:** :art: make plugins use the new custom events
* **mixins:** :boom: sliderhandler.ts - introduce new custom events

### Enhancements

* **mixins:** :art: carousel.ts - improve readability ([ea7043e](https://github.com/Matb85/modular-slider/commit/ea7043e3d31204f96f3d51d54f0f7de115a9ac4b))
* **mixins:** :boom: sliderhandler.ts - introduce new custom events ([8d54ebf](https://github.com/Matb85/modular-slider/commit/8d54ebf628d98c606ba723db8be222ad4ae082a9))
* **plugins:** :art: make plugins use the new custom events ([fa1c1a3](https://github.com/Matb85/modular-slider/commit/fa1c1a379ed03b33f7f2fa090cb8aa38ae14c40b))

### [0.6.4](https://github.com/Matb85/modular-slider/compare/v0.6.3...v0.6.4) (2022-02-08)

### [0.6.3](https://github.com/Matb85/modular-slider/compare/v0.6.2...v0.6.3) (2022-02-08)

### [0.6.2](https://github.com/Matb85/modular-slider/compare/v0.6.1...v0.6.2) (2022-01-14)


### Features

* :sparkles: add optional duration for every slide method ([ae01b53](https://github.com/Matb85/modular-slider/commit/ae01b534cfb507ce11d8b44b31f31aa3189e18bd))

### [0.6.1](https://github.com/Matb85/modular-slider/compare/v0.6.0...v0.6.1) (2022-01-14)


### Bug Fixes

* :bug: properly destroy the handler function in constructor ([78a7d3e](https://github.com/Matb85/modular-slider/commit/78a7d3e66ca7892a41e836bb946e1ebc088ad1d3))

## [0.6.0](https://github.com/Matb85/modular-slider/compare/v0.5.5...v0.6.0) (2021-10-30)


### Features

* :sparkles: add custom easings ([c71b842](https://github.com/Matb85/modular-slider/commit/c71b842946150c1793921f00581ab2b1dfb15140))


### Bug Fixes

* :art: letter casing of imports ([94c5371](https://github.com/Matb85/modular-slider/commit/94c53718ea2996821d21bdbb6235811a0ba28622))

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
