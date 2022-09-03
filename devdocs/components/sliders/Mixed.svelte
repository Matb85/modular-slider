<h3 class="header-3">A slider with several plugins</h3>
<section class="MS-wrapper MS-fixed mx-auto">
  <ul id="slider-mixed" class="MS-con blue-items">
    {#each sliderItems as item}
      <li class="MS-item">{item}</li>
    {/each}
  </ul>
</section>
<section id="slider-pagination-mixed-slider" class="mt-4 flex justify-center gap-2">
  <button class="dot"></button>
</section>
<section class="button-container">
  <button id="prev" class="button">prev</button>
  <button id="next" class="button">next</button>
</section>
<SliderCode>{code}</SliderCode>

<script lang="ts">
import SliderCode from "~/components/SliderCode.svelte";
import { onMount, onDestroy } from "svelte";
import Slider, { type SliderType } from "../factories/carouselFactory";
import { pagination, buttons, autoplay } from "@/index";

const sliderItems = [0, 1, 2, 3, 4, 5, 6];

let slider: SliderType;
onMount(async () => {
  slider = new Slider({
    container: "slider-mixed",
    initialSlide: 4,
    plugins: [
      pagination({
        container: "#slider-pagination-mixed-slider",
        dots: ".dot",
        addClass: ["current"],
      }),
      buttons({ nextBtn: "#next", prevBtn: "#prev" }),
      autoplay(3000),
    ],
  });
});
onDestroy(() => slider.destroy());

export const code = `import { setup, SlideHandler, Carousel, pagination } from "modular-slider";

const Slider = setup(Carousel, SlideHandler);
new Slider({
    container: "slider",
    initialSlide: 4,
    plugins: [
        pagination({
            container: "#slider-pagination",
            dots: ".dot",
            addClass: ["current"],
        }),
        buttons({ nextBtn: "#next", prevBtn: "#prev" }),
        autoplay(3000),
    ]
});`;
</script>
