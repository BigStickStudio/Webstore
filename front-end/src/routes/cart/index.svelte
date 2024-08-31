<script lang="ts">
    import ClothingItem from "$components/cart/clothing_item.svelte"
    import Orchestrator from "$components/orchestrator"
    import Button from "$components/ui/button/button.svelte"
    import * as Card from "$components/ui/card/index.js"
    import BookItem from "@/lib/components/cart/book_item.svelte"

    const orchestrator = Orchestrator.instance;
    $: cart_count = orchestrator.cart_count;
    $: shopping_cart = orchestrator.shopping_cart;

    const getSubtotal = () => {
        let subtotal = 0;
        shopping_cart.forEach((product) => {
            subtotal += (product.price * product.quantity);
        });
        return subtotal.toFixed(2);
    }

    const getItemCount = () => {
        let count = 0;
        shopping_cart.forEach((product) => {
            count += product.quantity;
        });
        return count;
    }

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
                        <div class="text-muted-foreground text-xs">
                            <!-- TODO: Add Proper Pagination -->
                            Showing <strong>1-10</strong> of <strong>{cart_count}</strong> products
                        </div>
                    </Card.Description>
                </Card.Header>
                <Card.Content>
                    <div class="flex flex-col gap-y-3">
                        {#each shopping_cart as product}
                            {#if product.category == "Clothing"}
                                <div id="item">
                                    <ClothingItem product={product} />
                                </div>
                            {:else}
                                <div id="item">
                                    <BookItem product={product} />
                                </div>
                            {/if}
                        {/each}
                    </div>
                </Card.Content>
                <Card.Footer>

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
                    <div class="flex flex-col">
                        Subtotal: ${getSubtotal()}
                        <br>Items: {getItemCount()}
                        <br><br>
                        <div class="ml-auto">
                            <Button>Order Now</Button>
                        </div>
                    </div>
                </Card.Content>
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

    div#item {
        border-radius: 1rem;
        box-shadow: 1px 1px 2px #5b534e22;
    }
</style>