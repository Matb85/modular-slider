import { Pipe, carousel, buttons, noloop, pagination } from "../src/index.js";

const Slider = Pipe([carousel, buttons, pagination]);

const slider = new Slider({
  container: ".slider-test",
  transitionSpeed: 400,
  slidesPerView: 2,
  navigation: {
    nextBtn: "#next",
    prevBtn: "#prev",
  },
  pagination: {
    container: ".slider-pagination",
    dots: ".dot",
    addClass: ["current", "adjacent"],
  },
});

console.log(slider);
