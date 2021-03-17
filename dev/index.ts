import { setup, slidehandler, carousel, buttons, pagination } from "../src/index.js";

const Slider = setup(carousel, slidehandler);
console.dir(Slider);
const slider = new Slider({
  container: ".ms-inner-con",
  transitionSpeed: 400,
  slidesPerView: 2,
  plugins: [
    buttons({ nextBtn: "#next", prevBtn: "#prev" }),
    pagination({
      container: ".slider-pagination",
      dots: ".dot",
      addClass: ["current", "adjacent"],
    }),
  ],
});

console.log(slider.plugins.buttons);
