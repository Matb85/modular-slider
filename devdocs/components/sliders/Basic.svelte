<h3 class="header-3">A basic slider</h3>

<section class="MS-wrapper MS-fixed mx-auto">
  <ol id="basic-slider" class="MS-con blue-items">
    {#each sliderItems as item}
      <li class="MS-item">{item}</li>
    {/each}
  </ol>
</section>

<section class="button-container">
  <button onclick={() => sl.slidePrev()} class="button">slider.slidePrev()</button>
  <button onclick={() => sl.slideNext()} class="button">slider.slideNext()</button>
  <button onclick={() => sl.slideTo(1)} class="button">slider.slideTo(1)</button>
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
import { NoLoop, slideHandler } from "@/index";
const sliderItems = [0, 1, 2, 3, 4, 5, 6];
let value = $state(2);

let sl: NoLoop;
let disabled = $state(false);

function initiate() {
  sl = new NoLoop({
    container: "basic-slider",
    transitionSpeed: 400,
    initialSlide: 2,
    plugins: [slideHandler()],
  });
  disabled = false;
}
function destroy() {
  sl.destroy();
  disabled = true;
}

onMount(initiate);
onDestroy(destroy);
export const code = `import { NoLoop, slideHandler } from "modular-slider";

new NoLoop({
    container: "slider",
    initialSlide: 2,
    plugins: [slideHandler()]
});`;
</script>
