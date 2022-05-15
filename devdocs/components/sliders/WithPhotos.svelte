<h3 class="header-3">A slider with photo lazy-loading</h3>
<section class="ms-outer-con mx-auto">
  <div id="slider-with-photos" class="ms-inner-con blue-items">
    <div class="img-con">
      <img class="ms-lazy" src="./assets/thumbnail_bird.jpg" data-src="./assets/bird.jpg" alt="birds" />
    </div>
    <div class="img-con">
      <img class="ms-lazy" src="./assets/thumbnail_gorge.jpg" data-src="./assets/gorge.jpg" alt="gorge" />
    </div>
    <div class="img-con">
      <img class="ms-lazy" src="./assets/thumbnail_mountains.jpg" data-src="./assets/mountains.jpg" alt="mountains" />
    </div>
    <div class="img-con">
      <img class="ms-lazy" src="./assets/thumbnail_bird.jpg" data-src="./assets/bird.jpg" alt="bird" />
    </div>
    <div class="img-con">
      <img class="ms-lazy" src="./assets/thumbnail_gorge.jpg" data-src="./assets/gorge.jpg" alt="gorge" />
    </div>
  </div>
</section>

<SliderCode>{code}</SliderCode>

<style>
.ms-outer-con div.img-con {
  overflow: hidden;
}
.ms-outer-con div.img-con :global(img.loaded) {
  filter: blur(0vw);
  transform: scale(1);
}
.ms-outer-con div.img-con img {
  transition: 0.4s transform, 0.4s filter;
  filter: blur(2vw);
  transform: scale(1.05);
  @apply w-full h-full object-cover inline-block;
}
</style>

<script>
import SliderCode from "~/components/SliderCode.svelte";
import { onMount, onDestroy } from "svelte";
import Slider from "../factories/carouselFactory";
import { lazyloading } from "@/index";

let slider;
onMount(async () => {
  slider = new Slider({
    container: "slider-with-photos",
    transitionSpeed: 400,
    initialSlide: 2,
    plugins: [lazyloading()],
  });
});
onDestroy(() => slider.destroy());

export const code = `import { setup, Slidehandler, Carousel, lazyloading } from "modular-slider";

const Slider = setup(Carousel, Slidehandler);
new Slider({
    container: "slider",
    initialSlide: 2,
    plugins: [
        plugins: [lazyloading()],
    ]
});`;
</script>
