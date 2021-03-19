<nav class="fixed top-0 z-50 w-full py-4 px-6 flex items-baseline text-center flex-row justify-between bg-white shadow ">
  <div class="mb-2 sm:mb-0">
    <a href="https://github.com/" class="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Modular Slider</a>
  </div>
  <div class="navbar-icons flex flex-row items-baseline gap-2">
    {#each icons as icon}
    <a href="{icon.url}">
      <svg viewBox="0 0 24 24">
        <path d="{icon.path}" />
      </svg>
    </a>
    {/each}
  </div>
</nav>

<script>
  import {mdiGithub, mdiHome} from "@mdi/js";
  export const icons = [
    {
      path: mdiGithub,
      url: "https://github.com/"
    },
    {
      path: mdiHome,
      url: "https://github.com/"
    }
  ]
  export {mdiGithub, mdiHome}
</script>

<style>
  .navbar-icons svg{
    @apply h-6 fill-current text-gray-800;
  }
</style>