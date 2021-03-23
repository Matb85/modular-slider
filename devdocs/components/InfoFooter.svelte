<footer class="w-full relative overflow-hidden">
  <hgroup class="relative z-50 mt-16 mb-36 mx-auto w-11/12 flex flex-col items-center justify-center">
    <h2 class="header-3">Check out the repo on Github!</h2>
    <a href="https://github.com/Matb85/modular-slider">
      <button class="button gap-2">
        <svg class="flex-none h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path d="{path}"></path>
        </svg>
        <span class="flex-none">Click here</span>
      </button>
    </a>
  </hgroup>
  <div class="wh-full absolute top-0" style="z-index: -1; filter: url('#aurora')"></div>
  <Wave class="absolute bottom-0" />
</footer>

<script>
import Wave from "~/components/Wave.svelte";
import { mdiGithub } from "@mdi/js";

let path = mdiGithub;
</script>
