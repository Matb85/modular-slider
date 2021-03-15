import { Pipe, carousel, buttons, pagination, interval } from "../src/index.js";
console.log(carousel);

const Slider = Pipe([carousel, buttons, pagination]);

const slider = new Slider({
  container: ".slider-test",
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

console.log(slider.dots);
