<Navbar />
<HeroHeader />
<main class="py-12">
  <Basic />
  <Carousel />
  <WithButtons />
  <WithPagination />
  <WithAutoplay />
</main>

<svg xmlns="http://www.w3.org/2000/svg" class="fixed top-full w-0 h-0">
  <filter id="aurora">
    <feTurbulence
      baseFrequency="0.0007"
      seed="14"
      type="fractalNoise"
      numOctaves="2"></feTurbulence>
    <feColorMatrix type="saturate" values="10" in="blur" result="colormatrix"
    ></feColorMatrix>
    <feColorMatrix
      type="hueRotate"
      values="90"
      in="colormatrix"
      result="colormatrix1"></feColorMatrix>
    <feGaussianBlur
      stdDeviation="30"
      in="turbulence"
      edgeMode="none"
      result="blur"></feGaussianBlur>
    <feComponentTransfer>
      <feFuncA type="linear" slope="0.6"></feFuncA>
    </feComponentTransfer>
  </filter>
</svg>

<style global>
html,
body {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
:root {
  --slides-per-view: 2;
  --slide-width: 300px;
  --slide-margin: 25px;
}
@media (max-width: 720px) {
  :root {
    --slides-per-view: 1;
    --slide-width: 250px;
    --slide-margin: 25px;
  }
}
h1,
h2,
h3,
h4,
h5,
h6,
p,
a {
  @apply text-gray-800;
}
.wh-full {
  @apply w-full h-full;
}
.header-3 {
  @apply text-5xl text-center mb-6 mt-16;
}
.ms-inner-con.blue-items .ms-item {
  @apply h-48 bg-blue-500 text-white text-7xl flex items-center justify-center cursor-pointer;
}
.button {
  @apply inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover\:bg-indigo-700;
}
.button[disabled] {
  @apply opacity-50 cursor-not-allowed;
}
</style>

<script>
import Navbar from "~/components/Navbar.svelte";
import HeroHeader from "~/components/HeroHeader.svelte";
import Basic from "~/components/sliders/Basic.svelte";
import Carousel from "~/components/sliders/Carousel.svelte";
import WithButtons from "~/components/sliders/WithButtons.svelte";
import WithPagination from "~/components/sliders/WithPagination.svelte";
import WithAutoplay from "~/components/sliders/WithAutoplay.svelte";
import "@style/modular-slider.css";
import "~/prismjs/prism.js";
import "~/prismjs/prism.css";
</script>
