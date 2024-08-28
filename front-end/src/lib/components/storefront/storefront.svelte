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
    <div id="products" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-24">
        {#each Object.keys(products) as product}
            <a id="product" href='/products/{product}'>
                <Product product_name={product} images={products[product]} />
            </a>
        {/each}
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 1rem;
    }

    a#product {
        display: flex;
        justify-content: center;
        width: 360px;
        align-items: center;
    }
</style>