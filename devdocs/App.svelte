<Navbar/>
<HeroHeader/>
<main class="mt-12">
  <Basic/>
  <WithButtons/>
  <WithPagination/>
</main>  


<script>
    import Navbar from "@/components/Navbar.svelte";
    import HeroHeader from "@/components/HeroHeader.svelte";
    import Basic from "@/components/sliders/Basic.svelte";
    import WithButtons from "@/components/sliders/WithButtons.svelte";
    import WithPagination from "@/components/sliders/WithPagination.svelte";
    import "@style/modular-slider.css";
    import "@/prismjs/prism.js"
    import "@/prismjs/prism.css"
</script>