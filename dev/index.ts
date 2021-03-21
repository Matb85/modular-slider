import { setup, Slidehandler, Carousel, buttons, pagination, lazyloading, autoplay } from "../src/index.js";

const Slider = setup(Carousel, Slidehandler);
console.dir(Slider);

const slider = new Slider({
  container: "first-slider",
  transitionSpeed: 400,
  plugins: [
    // autoplay(),
    buttons({ nextBtn: "#next", prevBtn: "#prev" }),
    pagination({
      container: ".slider-pagination",
      dots: ".dot",
      addClass: ["current", "adjacent"]
    })
  ]
});

const imageSlider = new Slider({
  container: "image-slider",
  transitionSpeed: 400,
  plugins: [lazyloading()]
});
