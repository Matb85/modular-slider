import { Pipe, carousel, buttons, noloop, pagination } from "../src/index.js";
console.log(carousel);

const Slider = Pipe([carousel, buttons, pagination]);

new Slider({
  container: ".slider-test",
  slidesPerView: 2,
  navigation: {
    nextBtn: "#next",
    prevBtn: "#prev",
  },
  pagination: {
    container: ".slider-pagination",
    dots: ".dot",
    type: "normal",
    addClass: "current",
  },
});
