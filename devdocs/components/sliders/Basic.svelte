<h3 class="header-3">A basic slider</h3>
<section class="ms-outer-con mx-auto">
  <div id="basic-slider" class="ms-inner-con blue-items">
    {#each sliderItems as item}
      <div class="ms-item">{item}</div>
    {/each}
  </div>
</section>
<SliderCode>{code}</SliderCode>

<script lang="ts">
import SliderCode from "~/components/SliderCode.svelte";
import { onMount } from "svelte";
import { setup, Slidehandler, Noloop } from "@/index";

export const sliderItems = [0, 1, 2, 3, 4, 5, 6];

onMount(async () => {
  const Slider = setup(Noloop, Slidehandler);
  new Slider({
    container: "basic-slider",
    transitionSpeed: 400,
    slidesPerView: 2,
  });
});

export const code = `import { setup, Slidehandler, Noloop } from "modular-slider";

const Slider = setup(Noloop, Slidehandler);
new Slider({
    container: "#slider",
    slidesPerView: 2,
});`;
</script>
