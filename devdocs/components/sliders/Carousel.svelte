<h3 class="header-3">A basic carousel</h3>

<section class="MS-wrapper MS-fixed mx-auto">
  <ul id="carousel-slider" class="MS-con blue-items">
    {#each sliderItems as item}
      <li class="MS-item">{item}</li>
    {/each}
  </ul>
</section>
<section class="button-container">
  <button onclick={() => sl.slidePrev()} class="button">slider.slidePrev()</button>
  <button onclick={() => sl.slideNext()} class="button">slider.slideNext()</button>
  <button onclick={() => sl.slideTo(0)} class="button">slider.slideTo(0)</button>
  <button onclick={() => sl.goTo(1)} class="button">slider.goTo(1)</button>
</section>

<section class="button-container">
  <input class="button w-24 bg-slate-200" type="number" bind:value max="{sliderItems.length}" min="1" />
  <button onclick={() => sl.slideBy(-1 * value)} class="button">slider.slideBy({-1 * value})</button>
  <button onclick={() => sl.slideBy(value)} class="button">slider.slideBy({value})</button>
</section>

<section class="button-container">
  <button onclick={destroy} disabled="{disabled}" class="button red">slider.destroy()</button>
  <button onclick={initiate} disabled="{!disabled}" class="button red">reinitiate</button>
</section>

<SliderCode>{code}</SliderCode>

<script lang="ts">
import SliderCode from "~/components/SliderCode.svelte";
import { onMount, onDestroy } from "svelte";
import { Carousel, swipeHandler } from "@/index";

const sliderItems = [0, 1, 2, 3, 4, 5, 6];
let value = $state(2);

let sl: Carousel;
let disabled = $state(false);

function initiate() {
  sl = new Carousel({
    container: "carousel-slider",
    transitionSpeed: 400,
    initialSlide: 4,
    plugins: [swipeHandler()],
  });
  disabled = false;
}
function destroy() {
  sl.destroy();
  disabled = true;
}

onMount(initiate);
onDestroy(destroy);

export const code = `import { Carousel, swipeHandler } from "modular-slider";

new Carousel({
    container: "slider",
    initialSlide: 4,
    plugins: [swipeHandler()],
});`;
</script>
