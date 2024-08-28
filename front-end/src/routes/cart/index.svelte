<script lang="ts">
    import Orchestrator from "$components/orchestrator"
    import Button from "$components/ui/button/button.svelte"
    import * as Card from "$components/ui/card/index.js"

    const orchestrator = Orchestrator.instance;
    $: cart_count = orchestrator.cart_count;

    let unsubscribe = orchestrator?.store.subscribe((state) => {
        cart_count = state.cart_count;
        console.log("Cart count: ", orchestrator.cart_count);
        console.log("Cart count updated to: ", cart_count);
    });
</script>

<main>
    <div class="container mx-auto flex flex-row">

        <div id="cart">
            <Card.Root>
                <Card.Header>
                    <Card.Title>Cart</Card.Title>
                    <Card.Description>
                        Manage your products and view their sales performance.
                    </Card.Description>
                </Card.Header>
                <Card.Content>
                    <Button variant="outline" 
                            on:click={() => {
                                console.log("Updating cart count");
                                orchestrator.cart_count += 1}}>
                        +1
                    </Button>
                </Card.Content>
                <Card.Footer>
                    <div class="text-muted-foreground text-xs">
                        Showing <strong>1-10</strong> of <strong>32</strong> products
                    </div>
                </Card.Footer>
            </Card.Root>
        </div>
        
        <div id="order">
            <Card.Root>
                <Card.Header>
                    <Card.Title>Order Details</Card.Title>
                    <Card.Description>
                        {new Date().toDateString()}
                    </Card.Description>
                </Card.Header>
                <Card.Content>
                    Subtotal: $0.00
                    <br>Items: {cart_count}
                    <br>
                    <Button>Order Now</Button>
                </Card.Content>
                <Card.Footer>
                </Card.Footer>
            </Card.Root>
        </div>
        
    </div>
</main>

<style>
    div#cart {
        width: 60vw;
        margin: 1rem;
    }

    div#order {
        width: 30vw;
        margin: 1rem;
    }
</style>