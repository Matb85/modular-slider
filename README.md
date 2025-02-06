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

### Architecture

Modular Slider consists of **_Mixins_**, **_Plugins_** and a **_Setup_** function:

#### Mixins

Mixins are objects that provide basic functionalities of the slider (i.e. touch/mouse events handling, transtions). Their names are **PascalCase** Currently, there are three mixins:

- SlideHandler - provides event handling - **compulsory if you want to drag the slider with mouse/touch**
- Carousel - provides methods for a carousel slider (with a loop)
- NoLoop - provides methods for a basic slider

#### Plugins

Plugins are functions that enrich your slider with non critical features. Their names are all **lowercase**. Here are the currently available plugins:

- Buttons - adds next/previous slide buttons
- Pagination - adds pagination
- autoplay - adds autoplay
- lazyloading - enables lazy loading images in the slider

#### The setup function

the setup function is used to combine mixins - basically this is the function that puts it all together!

### Usage

First of all download the package:

```
npm i modular-slider
pnpm i modular-slider
yarn add modular-slider
```

Once you've done that, take a look at an example setup:

1. add some markup

```html
<!-- the markup must include:-->
<!-- an OUTER CONTAINER with .MS-wrapper MS-fixed class-->
<!-- an INNER CONTAINER with .MS-con class-->
<!-- and some slides inside - their class DOES NOT matter -->
<section class="your-slider MS-wrapper MS-fixed">
  <ul id="first-slider" class="MS-con">
    <li class="nested-item">1</li>
    <li class="nested-item">2</li>
    <li class="nested-item">3</li>
    <li class="nested-item">4</li>
    <li class="nested-item">5</li>
    <li class="nested-item">6</li>
  </ul>
</section>
<!-- add buttons for the purpose of the example -->
<section class="slider-btn">
  <button id="prev">prev</button>
  <button id="next">next</button>
</section>
```

2. import css from "modular-slider/dist/modular-slider.css" and follow [**one of the available options**](#css-options). This example uses the default option

```scss
@import "~modular-slider/dist/modular-slider.css";

.your-slider {
  --number-of-slides: 6; // the number of the slides, total
  --slides-per-view: 2; // the number of how many slides are displayed at once
  // your css...
}
```

3. add js

```js
// import all the components you need
import { setup, SlideHandler, Carousel, buttons } from "modular-slider";

// merge the mixins with the setup functions
const Slider = setup(Carousel, SlideHandler);
// create a new instance
new Slider({
  // pass the ID of the slider container
  // pass only the name of the ID as the getElementByID methods is used
  container: "slider",
  // initiate selected plugins
  plugins: [
    // the button plugin uses the querySelector method,
    // hence the # at the beginning
    buttons({ nextBtn: "#next", prevBtn: "#prev" }),
  ],
});
```

**[You can find more examples here](https://matb85.github.io/modular-slider/)**

### CSS options

by default modular slider provides two css options. They both require some css variables that you may put either in the **:root** or **.MS-wrapper** element.

1. Width in percentage (default)
   the outer container has a specified width and the slides subordinate to it

> e.g. the container has width set to **30rem** or **80%** whereas slides have width set to **50%**

```scss
.your-slider.MS-wrapper {
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

```css
.your-slider.MS-fixed.MS-wrapper {
  --slide-width: 15rem; // the width of each slide
  --slide-margin: 25px; // the left and right margin of each element
  --slides-per-view: 2; // the number of how many slides are displayed at once
  // don't specify the width - it will be calculated based on the variables above
}
```

**By default --slide-margin is set to 0px.**

### Contributing

Modular Slider by design encourages users to enhance it. Don't like the event handlers? Write a mixin and change it. Want the buttons/pagination to automatically generate themselves? Write a plugin that will do that. If you have created such an improvement, fell free to share it. PRs are welcome! :fire:

## Keep in mind

These are the early days of this project, it hasn't reached v1 (stable version) yet, therefore there might be some breaking changes before releasing 1.0.0. :monocle_face::adhesive_bandage::boom:

## [See the changelog here](https://github.com/Matb85/modular-slider/blob/master/CHANGELOG.md)
