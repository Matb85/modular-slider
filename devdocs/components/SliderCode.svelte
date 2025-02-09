<script lang="ts">
    import type { Snippet } from "svelte";
  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<pre
  class="code-container">
    <code class="language-js">{@render children?.()}</code>
</pre>

<style lang="postcss">
    @reference "~/tailwind.css";
    .code-container {
      @apply w-11/12 max-w-3xl mx-auto my-4;
    }
</style>
