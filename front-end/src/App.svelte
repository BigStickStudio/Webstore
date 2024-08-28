<script lang="ts">
    import Orchestrator from '$components/orchestrator.js'
    import { Router } from '@roxi/routify'
    import routes from '../.routify/routes.default.js'

    const orchestrator = Orchestrator.instance;
    $: is_mobile = false;

    const isMobile = () => 
        { orchestrator.is_mobile = window.innerWidth <= 800; }

    let unsubscribe = orchestrator?.store.subscribe((state) => 
        { is_mobile = state.is_mobile; });
</script>


<svelte:window on:resize={isMobile} on:load={isMobile} />

<main>

    <Router {routes} />
</main>

<style>
    main {
        background-attachment: fixed;
        background-image: 
            linear-gradient(90deg, transparent, #f6d0e61b),
            linear-gradient(180deg, transparent, #b6f5e039);
    }
</style>