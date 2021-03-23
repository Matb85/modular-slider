<h3 class="header-3">A slider with pagination</h3>
<section class="ms-outer-con mx-auto">
  <div id="slider-with-pagination" class="ms-inner-con blue-items">
    {#each sliderItems as item}
      <div class="ms-item">{item}</div>
    {/each}
  </div>
</section>
<section id="slider-pagination" class="mt-4 flex justify-center gap-2">
  <button class="dot"></button>
</section>
<SliderCode>{code}</SliderCode>

<script lang="ts">
import SliderCode from "~/components/SliderCode.svelte";
import { onMount } from "svelte";
import Slider from "../factories/carouselFactory";
import { pagination } from "@/index";

const sliderItems = [0, 1, 2, 3, 4, 5, 6];

onMount(async () => {
  new Slider({
    container: "slider-with-pagination",
    plugins: [
      pagination({
        container: "#slider-pagination",
        dots: ".dot",
        addClass: ["current"],
      }),
    ],
  });
});

export const code = `import { setup, Slidehandler, Carousel, pagination } from "modular-slider";

const Slider = setup(Carousel, Slidehandler);
new Slider({
    container: "slider",
    plugins: [
        pagination({
            container: "#slider-pagination",
            dots: ".dot",
            addClass: ["current"]
        }),
    ]
});`;
</script>
