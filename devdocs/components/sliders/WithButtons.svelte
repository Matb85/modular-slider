<h3 class="header-3">A slider with buttons</h3>

<section class="MS-wrapper MS-fixed mx-auto">
  <ul id="slider-with-btns" class="MS-con blue-items">
    {#each sliderItems as item}
      <li class="MS-item">{item}</li>
    {/each}
  </ul>
</section>

<section class="button-container">
  <button id="with-buttons-prev" class="button">prev</button>
  <button id="with-buttons-next" class="button">next</button>
</section>

<SliderCode>{code}</SliderCode>

<script lang="ts">
import SliderCode from "~/components/SliderCode.svelte";
import { onMount, onDestroy } from "svelte";
import { Carousel, slideHandler, buttons } from "@/index";

const sliderItems = [0, 1, 2, 3, 4, 5, 6];

let slider: Carousel;
onMount(async () => {
  slider = new Carousel({
    container: "slider-with-btns",
    initialSlide: 0,
    plugins: [slideHandler(), buttons({ nextBtn: "#with-buttons-next", prevBtn: "#with-buttons-prev" })],
  });
});
onDestroy(() => slider.destroy());

export const code = `import { Carousel, slideHandler, buttons } from "modular-slider";

new Slider({
    container: "slider",
    initialSlide: 0,
    plugins: [slideHandler(), buttons({ nextBtn: "#next", prevBtn: "#prev" })],
});`;
</script>
