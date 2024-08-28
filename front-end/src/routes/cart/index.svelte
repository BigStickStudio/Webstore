<script lang="ts">
    import Orchestrator from "$components/orchestrator"
    import Button from "$components/ui/button/button.svelte"
    import * as Card from "$components/ui/card/index.js"

    const orchestrator = Orchestrator.instance;
    $: cart_count = orchestrator.cart_count;
    $: shopping_cart = orchestrator.shopping_cart;

    let unsubscribe = orchestrator?.store.subscribe((state) => {
        shopping_cart = state.shopping_cart;
        cart_count = shopping_cart.length;
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
                    {#each shopping_cart as product}
                        {#if product.category == "Clothing"}
                            <div>
                                <strong>{product.product}</strong>
                                Color: {product.color}<br>
                                Size: {product.size}<br>
                                Quantity: {product.quantity}<br>
                                Price: ${product.price}<br>
                                <Button>Remove</Button>
                            </div>
                        {:else}
                            <div>
                                <strong>{product.product}</strong>
                                Quantity: {product.quantity}<br>
                                Price: ${product.price}<br>
                                <Button>Remove</Button>
                            </div>
                        {/if}
                    {/each}
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