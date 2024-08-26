<script lang="ts">
    import Product from "$components/storefront/product.svelte"

    const products_list: any = import.meta.glob("$assets/**/*.png");
    let products: Record<string, Array<string>> = {};

    for(const product in products_list) {
        let product_path = product.split("/");
        let product_name = product_path[product_path.length - 2];
        
        if(products[product_name] === undefined) {
            products[product_name] = [];
        }

        products[product_name].push(product);
    }
</script>

<main>
    Store Front
    <br>

    <div id="products">
        {#each Object.keys(products) as product}
            <a href='products/{product}'>
                <Product product_name={product} images={products[product]} />
            </a>
        {/each}
    </div>
</main>

<style>
    div#products {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 1rem;
    }
</style>