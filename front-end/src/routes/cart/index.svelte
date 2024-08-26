<script lang="ts">
    import Orchestrator from "$components/orchestrator"
    import Button from "$components/ui/button/button.svelte"

    const orchestrator = Orchestrator.instance;
    $: cart_count = orchestrator.cart_count;

    let unsubscribe = orchestrator?.store.subscribe((state) => {
        cart_count = state.cart_count;
        console.log("Cart count: ", orchestrator.cart_count);
        console.log("Cart count updated to: ", cart_count);
    });
</script>

<div class="container mx-auto p-10">
    My Cart: 
    <br>Items: {cart_count}

    <br>
    <br>
    <Button variant="outline" 
            on:click={() => {
                console.log("Updating cart count");
                orchestrator.cart_count += 1}}>
        +1
    </Button>
</div>
