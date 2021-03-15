import { Pipe, carousel } from "../src/index.js";
console.log(carousel);

const Slider = Pipe([carousel]);

new Slider({ container: ".slider-test" });
