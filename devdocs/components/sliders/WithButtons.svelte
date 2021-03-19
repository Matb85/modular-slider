<h3 class="header-3">A slider with buttons</h3>
<section class="ms-outer-con mx-auto">
  <div id="slider-with-btns" class="ms-inner-con blue-items">
    {#each sliderItems as item}
      <div class="ms-item">{item}</div>
    {/each}
  </div>
</section>
<section class="flex justify-center gap-4 mt-4">
  <button id="prev" class="button">prev</button>
  <button id="next" class="button">next</button>
</section>
<SliderCode>{code}</SliderCode>

<script lang="ts">
import SliderCode from "~/components/SliderCode.svelte";
import { onMount } from "svelte";
import { setup, Slidehandler, Carousel, buttons } from "@/index";

export const sliderItems = [0, 1, 2, 3, 4, 5, 6];

onMount(async () => {
  const Slider = setup(Carousel, Slidehandler);
  new Slider({
    container: "#slider-with-btns",
    slidesPerView: 2,
    plugins: [buttons({ nextBtn: "#next", prevBtn: "#prev" })],
  });
});

export const code = `import { setup, Slidehandler, Carousel, buttons } from "modular-slider";

const Slider = setup(Carousel, Slidehandler);
new Slider({
    container: "#slider",
    slidesPerView: 2,
    plugins: [
        buttons({ nextBtn: "#next", prevBtn: "#prev" }),
    ]
});`;
</script>
