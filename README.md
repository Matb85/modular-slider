# Modular Slider

## A dependency-free slider with NO DOM manipulations, written in Typescript

### [Check out the demos here](https://matb85.github.io/modular-slider/)

Modular Slider aims to deliver just what you want, while using the best of EcmaScript goodies. Here are some of its features:

- :label: written in Typescript and ESM
- :zap: relies on promises, async/await and event listeners
- :art: modular architecture - optimized for tree-shaking, weighs nothing in your final build
- :fire: absolutely no DOM manipulations - no removing, adding or cloning nodes, just class and style attribute tweaks
- :rocket: works perfectly with any frontend framework - does not break down v-dom thanks to no DOM manipulations
- :boom: supports SSR - tested in [Nuxt.js](https://nuxt.com/) & [SvelteKit](https://svelte.dev/)

**This package ships as an esm module only.**

## Architecture

Modular Slider consists of **_base classes_** and **_plugins_**:

### Base classes

Base classes provide basic functionalities of the slider. Their names are **PascalCase**. currently, there are 3 mixins:

- Carousel - provides methods for a carousel slider (with a loop)
- NoLoop - provides methods for a basic slider
- SliderBase - an abstract class, not a ready-to-use slider, provides basic methods for creating your own slider

### Plugins

Plugins are functions that enrich your slider with non-critical features. Their names are all **lowercase**. Here are the currently available plugins:

- swipeHandler - provides event handling - **compulsory if you want to drag the slider with mouse/touch**
- buttons - adds next/previous slide buttons
- pagination - adds pagination
- autoplay - adds autoplay
- lazyLoading - enables lazy loading images in the slider

### The setup function

the setup function is used to combine mixins - basically this is the function that puts it all together!

## Usage

First of all download the package:

```bash
$ npm i modular-slider
$ pnpm i modular-slider
$ yarn add modular-slider
```

Once you've done that, take a look at an example setup:

1. Add markup, that includes:

- outer **container** with **id** and **.MS-wrapper** class
- inner **container** with **.MS-con** class 
- some **slides inside** - no classes required

```html
<section class="your-slider-class MS-wrapper">
  <ul id="your-slider-id" class="MS-con">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
  </ul>
</section>

<!-- add buttons for the purpose of the example -->
<section class="slider-buttons">
  <button id="prev">prev</button>
  <button id="next">next</button>
</section>
```

2. import css from "modular-slider/dist/modular-slider.css" and follow [**one of the available options**](#css-options). This example uses the default option

```scss
@import "modular-slider/dist/modular-slider.css";

.your-slider-class {
  --number-of-slides: 6; // the number of the slides, total
  --slides-per-view: 2; // the number of how many slides are displayed at once
  // your css...
}
```

3. Add js

```js
import { Carousel, swipeHandler, lazyLoading } from "modular-slider";

new Carousel({
   container: "your-slider-id", // id of the inner container
   initialSlide: 1, // optional, default is 0
   plugins: [
      // enables dragging the slider with mouse/touch
      swipeHandler(),
      // the button plugin uses the querySelector method, hence # at the beginning
      buttons({ nextBtn: "#next", prevBtn: "#prev" })
   ],
});
```

**[You can find more examples here](https://matb85.github.io/modular-slider/)**

## CSS options

By default, modular slider provides two css options. They both require some css variables that you may put either in the **:root** or **.MS-wrapper** element.

1. Width in percentage (default)
   the outer container has a specified width and the slides subordinate to it

> e.g. the container has width set to **30rem** or **80%** whereas slides have width set to **50%**

```scss
.your-slider-class.MS-wrapper {
  // you DON'T have to set --number-of-slides - it's just a fallback value just in case something goes wrong
  --number-of-slides: 6; // the number of the slides, total
  --slides-per-view: 2; // the number of how many slides are displayed at once
  --slide-margin: 25px; // the left and right margin of each element
  width: 80%; // add some width
}
```

2. Fixed width (add **.MS-fixed** class)
   the slides have a specified width - the container subordinates to them

> e.g. the container **does not** have a set width whereas slides have width set to **15rem**

```scss
.your-slider-class.MS-fixed.MS-wrapper {
  --slide-width: 15rem; // the width of each slide
  --slide-margin: 25px; // the left and right margin of each element
  --slides-per-view: 2; // the number of how many slides are displayed at once
  // don't specify the width - it will be calculated based on the variables above
}
```

**By default --slide-margin is set to 0px.**

### Contributing

Modular Slider by design encourages users to enhance it. Don't like the event handlers? Want the buttons/pagination to automatically generate themselves? Write a plugin that will do that. If you have created such an improvement, fell free to share it. PRs are welcome! :fire:

## [See the changelog here](https://github.com/Matb85/modular-slider/blob/master/CHANGELOG.md)
