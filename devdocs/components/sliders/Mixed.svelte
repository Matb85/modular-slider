<h3 class="header-3">A slider with several plugins</h3>

<section class="MS-wrapper MS-fixed mx-auto">
  <ul id="slider-mixed" class="MS-con blue-items">
    {#each sliderItems as item}
      <li class="MS-item">{item}</li>
    {/each}
  </ul>
</section>

<section id="slider-pagination-mixed-slider" class="mt-4 flex justify-center gap-2">
  <button class="dot" aria-label="slide button"></button>
</section>

<section class="button-container">
  <button id="mixed-prev" class="button">prev</button>
  <button id="mixed-next" class="button">next</button>
</section>
<SliderCode>{code}</SliderCode>

<script lang="ts">
import SliderCode from "~/components/SliderCode.svelte";
import { onMount, onDestroy } from "svelte";
import {Carousel, swipeHandler, pagination, buttons, autoplay } from "@/index";

const sliderItems = [0, 1, 2, 3, 4, 5, 6];

let slider: Carousel;
onMount(async () => {
  slider = new Carousel({
    container: "slider-mixed",
    initialSlide: 4,
    plugins: [
      swipeHandler(),
      pagination({
        container: "#slider-pagination-mixed-slider",
        dots: ".dot",
        addClass: ["current"],
      }),
      buttons({ nextBtn: "#mixed-next", prevBtn: "#mixed-prev" }),
      autoplay(3000),
    ],
  });
});
onDestroy(() => slider.destroy());

export const code = `import { Carousel, swipeHandler, pagination, buttons, autoplay } from "modular-slider";

new Carousel({
    container: "slider",
    initialSlide: 4,
    plugins: [
        swipeHandler(),
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
