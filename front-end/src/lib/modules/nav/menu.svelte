<script>
    import MenuItem from './menu_item.svelte'
    export let title;
    export let icon;
    export let items;

    let expanded = false;

    const toggleExpanded = () => { expanded = !expanded; }
</script>

<main>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="flex h-9 ml-auto items-center transition-colors hover:text-muted-foreground"
        on:click={toggleExpanded}
    >
        <svelte:component this={icon} />
        <span class="sr-only">{title}</span>
    </div> 

    {#if expanded}
        <div id="dropdown">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            {#each Object.keys(items) as item}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div id="dropdown-item" class="flex h-9 items-center"
                    on:click={toggleExpanded}>
                    <MenuItem title={item} path={items[item].path} icon={items[item].icon} />
                </div>
            {/each}
        </div>
    {/if}
</main>

<style>
    main {
        z-index: 10;
    }

    div#dropdown {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        margin-top: 2rem;
        padding: 0.25rem 0 0.25rem 0;
        width: 8rem;
        right: 1rem;
        background-color: rgba(255, 255, 255, 0.906);
        border: 1px solid rgba(0, 0, 0, 0.548);
        padding: 0 0.25rem 0 0.25rem;
        border-radius: 0.5rem;
    }

    div#dropdown-item {
        display: flex;
        width: 100%;
        border-radius: 0.25rem;
        z-index: 10;
    }
</style>