<script lang="ts">
  import * as Tooltip from "$components/ui/tooltip/index.js"
  export let title = "unassigned";
  export let icon = {};
  export let path = undefined;
</script>


<main>
  <Tooltip.Root>
    <Tooltip.Trigger asChild let:builder>
      <a href={path} 
          use:builder.action
          {...builder}>
          <div class="menu_item">
            <div id="icon">
              <svelte:component this={icon} class="h-5 w-5" />
            </div>
            <div id="title">
              {title}
            </div>
            <span class="sr-only">{title}</span>
          </div>
      </a>
    </Tooltip.Trigger>
  </Tooltip.Root>
</main>

<style>
  main {
    display:flex;
    flex-direction: column;
    width: 100%;
    border-radius: 0.25rem;
    padding: 0.25rem;
    box-shadow: 0 0 3px #00000011;
  }

  main:hover {
    background-color: rgba(163, 163, 163, 0.109);
    color: rgba(0, 0, 0, 0.853);
    box-shadow: 0 0 0 #FFF;
  }

  .menu_item {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }

  div#icon {
    margin-left: 0.25rem;
  }

  div#title {
    padding-left: 0.75rem;
  }
</style>