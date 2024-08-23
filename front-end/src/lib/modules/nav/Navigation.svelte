<script lang="ts">
    import Element from "./element.svelte"

    import Cart from "lucide-svelte/icons/shopping-cart"
    import Store from "lucide-svelte/icons/store"
    import UsersRound from "lucide-svelte/icons/users-round"
</script>

<div class="flex min-h-screen w-full flex-col bg-muted/40">
  <div>
    <aside class="inset-y-0 z-10 hidden h-8 flex-row border-b bg-background sm:flex">
      <nav class="flex flex-row ml-auto mr-4 items-center gap-4 px-2 py-4">
        <Element title="Home" path="/" icon={Store} />
        <Element title="Cart" path="/cart" icon={Cart} />
        <Element title="Account" path="/user" icon={UsersRound} />
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