<script lang="ts">
    export let title = "unassigned";
    export let icon = {};
    export let path = undefined;
</script>

<main>
  <a
    href={path}
    class="flex items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-4 md:w-4"
  >
    <div class="menu_item">
      <div>
        <svelte:component this={icon} class="h-5 w-5" />
      </div>
      <div>
        {title}
      </div>
      <span class="sr-only">{title}</span>
    </div>
  </a>
</main>

<style>
  .menu_item {
    display: flex;
    width: 100%;
  }
</style>