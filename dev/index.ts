import { Pipe, carousel, buttons, noloop, pagination, autoplay } from "../src/index.js";

const Slider = Pipe([carousel, pagination]);

const slider = new Slider({
  container: ".slider-test",
  transitionSpeed: 400,
  slidesPerView: 2,
  pagination: {
    container: ".slider-pagination",
    dots: ".dot",
    addClass: ["current", "adjacent"],
  },
  plugins: [buttons({ nextBtn: "#next", prevBtn: "#prev" }), autoplay()],
});

console.log(slider);
