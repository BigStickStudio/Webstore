<script>
    export let product;
    import Button from "$components/ui/button/button.svelte"
    import Orchestrator from "../orchestrator"

    let orchestrator = Orchestrator.instance;

    const removeItem = (e) => {
        e.preventDefault();
        let res = orchestrator.removeFromCart(product);
        alert("Item Removed:" + res);
    }

</script>

<main class="flex flex-row justify-around gap-4">
    <div class="grow-0 shrink-0 mx-2 items-center self-center">
        <a id="product" href='/products/{product.product_name}'>
            <img src={product.image} alt={product.product} width="100" height="100">
        </a>
    </div>
    <div class="grow flex flex-col flex-start justify-between px-2 basis-1/2">
        <div>
            <!-- TODO: Add Color Specific Parameters -->
            <a id="product" href='/products/{product.product_name}'>
                <strong>{product.product}</strong>
            </a>
        </div>
        <div>
            Quantity: {product.quantity}<br>
        </div>
    </div>
    <div id="review" class="flex flex-col justify-between basis-1/5">
        <div class="p-2">
            <b>Price</b>: ${product.price}<br>
        </div>
        <div class="ml-auto m-3 mx-5">
            <!-- TODO: Add a Remove function to the Orchestrator / Cart -->
            <Button on:click={removeItem} 
                    variant="outline">
                Remove
            </Button>
        </div>
    </div>
</main>

<style>
    main {
        padding: 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
    }

    img {
        border-radius: 10px;
    }
</style>