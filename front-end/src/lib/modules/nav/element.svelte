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
        class="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
        use:builder.action
        {...builder}
      >
        <svelte:component this={icon} />
        <span class="sr-only">{title}</span>
      </a>
    </Tooltip.Trigger>
    <Tooltip.Content side="right">{title}</Tooltip.Content>
</Tooltip.Root>