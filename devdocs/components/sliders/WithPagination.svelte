<h3 class="header-3">A slider with pagination</h3>
<section class="MS-wrapper MS-fixed mx-auto">
  <ul id="slider-with-pagination" class="MS-con blue-items">
    {#each sliderItems as item}
      <li class="MS-item">{item}</li>
    {/each}
  </ul>
</section>
<section id="slider-pagination" class="mt-4 flex justify-center gap-2">
  <button class="dot" aria-label="slider button"></button>
</section>

<SliderCode>{code}</SliderCode>

<style lang="postcss" global>
    @reference "~/tailwind.css";

    .dot {
    @apply h-4 w-4 rounded-full bg-indigo-400 hover:bg-indigo-800 focus:outline-none;
  }
  .current {
    @apply bg-indigo-800;
  }
</style>

<script lang="ts">
import SliderCode from "~/components/SliderCode.svelte";
import { onMount, onDestroy } from "svelte";
import { Carousel, swipeHandler, pagination} from "@/index";

const sliderItems = [0, 1, 2, 3, 4, 5, 6];

let slider: Carousel;
onMount(async () => {
  slider = new Carousel({
    container: "slider-with-pagination",
    initialSlide: 4,
    plugins: [
      swipeHandler(),
      pagination({
        container: "#slider-pagination",
        dots: ".dot",
        addClass: ["current"],
      }),
    ],
  });
});
onDestroy(() => slider.destroy());

export const code = `import { Carousel, swipeHandler, pagination } from "modular-slider";

new Slider({
    container: "slider",
    initialSlide: 4,
    plugins: [
        swipeHandler(),
        pagination({
            container: "#slider-pagination",
            dots: ".dot",
            addClass: ["current"]
        }),
    ]
});`;
</script>
