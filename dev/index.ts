import { setup, Slidehandler, Carousel, buttons, pagination, lazyloading, autoplay } from "../src/index.js";

const Slider = setup(Carousel, Slidehandler);
console.dir(Slider);
const slider = new Slider({
  container: "#first-slider",
  transitionSpeed: 400,
  slidesPerView: 2,
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

console.log(slider.plugins.buttons);

const imageSlider = new Slider({
  container: "#image-slider",
  transitionSpeed: 400,
  slidesPerView: 2,
  plugins: [lazyloading()]
});
console.log(imageSlider);
