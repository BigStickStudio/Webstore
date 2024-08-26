<script lang="ts">
    import Orchestrator from '$components/orchestrator.js'
    import { Router } from '@roxi/routify'
    import routes from '../.routify/routes.default.js'

    const orchestrator = Orchestrator.instance;
    $: is_mobile = false;

    const isMobile = () => {
        orchestrator.is_mobile = window.innerWidth <= 800 || window.innerHeight < 600;
    }

    let unsubscribe = orchestrator?.store.subscribe((state) => {
        is_mobile = state.is_mobile;
    });
</script>

<svelte:window on:resize={isMobile} on:load={isMobile} />

<main>
    <Router {routes} />
</main>
