<script>
    import * as Dropdown from '$components/ui/dropdown-menu'
    import MenuItem from './menu_item.svelte'
    export let title;
    export let icon;
    export let items;
</script>

<main>
    <Dropdown.Root>
        <Dropdown.Trigger>
            <div class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-4 md:w-4">
                <svelte:component this={icon} class="h-5 w-5" />
                <span class="sr-only">{title}</span>
            </div> 
        </Dropdown.Trigger>
        <Dropdown.Content>
            <Dropdown.Group>
                {#each Object.keys(items) as item}
                    <Dropdown.Item>
                        <MenuItem title={item} path={items[item].path} icon={items[item].icon} />
                    </Dropdown.Item>
                {/each}
            </Dropdown.Group>
        </Dropdown.Content>
    </Dropdown.Root>
</main>