import { Pipe, carousel, buttons, noloop, pagination } from "../src/index.js";

const Slider = Pipe([carousel, buttons, pagination]);

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
    type: "multiple",
    addClass: ["current", "adjacent"],
  },
});

console.log(slider);
