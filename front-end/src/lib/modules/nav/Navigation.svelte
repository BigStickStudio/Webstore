<script lang="ts">
    import Orchestrator from "$components/orchestrator"
    import Cart from "lucide-svelte/icons/shopping-cart"
    import Hamburger from "lucide-svelte/icons/square-menu"
    import Store from "lucide-svelte/icons/store"
    import UsersRound from "lucide-svelte/icons/users-round"
    import Element from "./element.svelte"
    import Menu from "./menu.svelte"

    const orchestrator = Orchestrator.instance
    $: is_mobile = false

    const item_map = {
        "Home": {path: "/", icon: Store},
        "Cart": {path: "/cart", icon: Cart},
        "Account": {path: "/user", icon: UsersRound}
    }

    let unsubscribe = orchestrator?.store.subscribe(
        (state) => { is_mobile = state.is_mobile}
      )
</script>

<div class="flex min-h-screen w-full flex-col bg-muted/40">
  <div>
    <aside class="inset-y-0 z-10 hidden h-8 flex-row border-b bg-background sm:flex">
      <nav class="flex flex-row ml-auto mr-4 items-center gap-4 px-2 py-4">
        {#if is_mobile}  
          <Menu title="Menu" icon={Hamburger} items={item_map} />
        {:else}
          {#each Object.keys(item_map) as item}
            <Element title={item} path={item_map[item].path} icon={item_map[item].icon} />
          {/each}
        {/if}
      </nav>
    </aside>
  </div>
  <div>
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header
        class="items-center gap-4 border-b bg-background px-4 sm:h-auto sm:border-0 sm:bg-transparent"
      >



            <slot />
        </header> 
    </div>
  </div>
</div>