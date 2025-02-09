<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<pre
  class="code-container">
    <code class="language-js mx-auto">{@render children?.()}</code>
</pre>

<style>
    @reference "~/tailwind.css";
.code-container {
  @apply w-11/12 max-w-3xl mx-auto my-4;
}
</style>
