import { Pipe, carousel, buttons, pagination, interval } from "../src/index.js";
console.log(carousel);

const Slider = Pipe([carousel, buttons]);

const slider = new Slider({
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

console.log(slider.dots);
