<Navbar />
<HeroHeader />
<main class="pb-12">
  <Basic />
  <Carousel />
  <WithButtons />
  <WithPagination />
  <WithAutoplay />
  <WithPhotos />
  <Mixed />
</main>
<InfoFooter />

<svg xmlns="http://www.w3.org/2000/svg" class="fixed top-full w-0 h-0">
  <filter id="aurora">
    <feTurbulence baseFrequency="0.0007" seed="49" type="fractalNoise" numOctaves="2"></feTurbulence>
    <feColorMatrix type="saturate" values="10" result="colormatrix"></feColorMatrix>
    <feColorMatrix type="hueRotate" values="90" in="colormatrix" result="colormatrix1"></feColorMatrix>
    <feGaussianBlur stdDeviation="30" in="turbulence" edgeMode="none" result="blur"></feGaussianBlur>
    <feComponentTransfer>
      <feFuncA type="linear" slope="0.5"></feFuncA>
    </feComponentTransfer>
  </filter>
</svg>

<script lang="ts">
import Navbar from "~/components/Navbar.svelte";
import HeroHeader from "~/components/HeroHeader.svelte";
import Basic from "~/components/sliders/Basic.svelte";
import Carousel from "~/components/sliders/Carousel.svelte";
import WithButtons from "~/components/sliders/WithButtons.svelte";
import WithPagination from "~/components/sliders/WithPagination.svelte";
import WithAutoplay from "~/components/sliders/WithAutoplay.svelte";
import WithPhotos from "~/components/sliders/WithPhotos.svelte";
import Mixed from "~/components/sliders/Mixed.svelte";

import InfoFooter from "~/components/InfoFooter.svelte";
import "~/prismjs/prism.js";
import "~/prismjs/prism.css";
</script>
