import { setup, carousel, buttons, pagination, autoplay } from "../src/index.js";

const Slider = setup(carousel);
console.dir(Slider);
const slider = new Slider({
  container: ".slider-test",
  transitionSpeed: 400,
  slidesPerView: 2,
  plugins: [
    buttons({ nextBtn: "#next", prevBtn: "#prev" }),
    autoplay(3000),
    pagination({
      container: ".slider-pagination",
      dots: ".dot",
      addClass: ["current", "adjacent"],
    }),
  ],
});

console.log(slider.plugins.buttons);
