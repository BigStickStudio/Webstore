<script>
    import * as Tooltip from "$components/ui/tooltip/index.ts"
    
    export let title = "unassigned";
    export let icon = {};
    export let path = undefined;
</script>

<Tooltip.Root>
    <Tooltip.Trigger asChild let:builder>
      <a
        href={path}
        class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-4 md:w-4"
        use:builder.action
        {...builder}
      >
        <svelte:component this={icon} class="h-5 w-5" />
        <span class="sr-only">{title}</span>
      </a>
    </Tooltip.Trigger>
    <Tooltip.Content side="right">{title}</Tooltip.Content>
</Tooltip.Root>