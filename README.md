# Modular Slider

## A dependency free slider with a modular approach, written in Typescript

### Check out the demos

Modular Slider aims to deliver just what you want while using the best EcmaScript goodies. Here are some of its features:

- :label: written in Typescript
- :zap: relies on promises and async/await functions
- :art: modular architecture => greatly optimized for tree-shaking
- :rocket: weighs nothing in your final build

**Prease Note:**
**this package ships in the es2017 format, therefore you may need to use a transpiler for production**

### Architecture

Modular Slider consists of **_Mixins_**, **_Plugins_** and a **_Setup_** function

#### Mixins

Mixins are classes (abstract in TS) that provide basic functionalities of the slider (i.e. touch/mose events handling, transtions). Their names begin with a **Capital letter** Currently, there are three mixins:

- SlideHandler - provides event handling - **compulsory**
- Carousel - provides methods for a carousel slider (with a loop)
- Noloop - provides methods for a basic slider

#### Plugins

Plugins are functions that enrich your slider with non critical feature. Their names are all **lowercase**. Here are the currently available plugins:

- Buttons - adds next/previous slide buttons
- Pagination - adds pagination
- autoplay - adds autoplay
- lazyloading - enables lazy loading images in the slider

#### The setup functions

the setup function is used to combine mixins - basically this is the function that puts it all together!

### Usage

Here is an exaple setup

1. add some markup

```html
<!-- the markup must include:-->
<!-- an OUTER CONTAINER with .ms-outer-con class-->
<!-- an INNER CONTAINER with .ms-inner-con class-->
<!-- and some slides inside - their class DOES NOT matter -->
<section class="your-slider ms-outer-con width-in-percentage">
  <div id="first-slider" class="ms-inner-con">
    <div class="nested-item"><div>1</div></div>
    <div class="nested-item"><div>2</div></div>
    <div class="nested-item"><div>3</div></div>
    <div class="nested-item"><div>4</div></div>
    <div class="nested-item"><div>5</div></div>
    <div class="nested-item"><div>6</div></div>
  </div>
</section>
<!-- add buttons for the purpose of the example -->
<section class="slider-btn">
  <button id="prev">prev</button>
  <button id="next">next</button>
</section>
```

2. import css from "modular-slider/dist/modular-slider.css" and follow **one of the available strategies**. This example uses the _width-in-percentage_ strategy

```scss
@import "~modular-slider/dist/modular-slider.css" .your-slider {
  --number-of-slides: 6; // the number of the slides, total
  --slides-per-view: 2; // the number of how many slides are displayed at once
  // your css...
}
```

3. add js

```js
// import all the components you need
import { setup, Slidehandler, Carousel, buttons } from "modular-slider";

// merge the mixins with the setup functions
const Slider = setup(Carousel, Slidehandler);
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

**You can find more examples here**

### CSS strategies

by default modular slider provides two css strategies. They both require some css variable that you can put in the **:root** or the **.ms-outer-con** element

1. Fixed width (default)
   to use it you need to decare the following variables:

```scss
.ms-outer-con.your-slider {
  --slide-width: 15rem; // the width of each slide
  --slide-margin: 25px; // the left and right margin of each element
  --slides-per-view: 2; // the number of how many slides are displayed at once
}
```

2. Width in percentage (add **width-in-percentage** class)

```scss
.ms-outer-con.your-slider {
  --number-of-slides: 6; // the number of the slides, total
  --slides-per-view: 2; // the number of how many slides are displayed at once
}
```

### Contributing

Modular Slider by design encourages users to enhance it. Don't like the event handlers? Write a mixin and change it. Want the buttons/pagination to automatically generate themselves? Write a plugin that will do that. If you have created such an improvement, sure share it, PRs are welcome! :fire:

## Keep in mind

These are the early days of this project, it hasn't reached v1 (stable version) yet, therefore there might be some breaking changes before releasing 1.0.0.
