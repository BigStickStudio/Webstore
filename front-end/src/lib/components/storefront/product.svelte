<script>
    export let product_name = "";
    export let images = undefined;
</script>

<main>
    {product_name.replace(/\-/g, " ").toUpperCase()}
    <div class="flex flex-row">
        {#each images as image}
            <img src={image} alt={product_name} />
        {/each}
    </div>
</main>

<style>
    img {
        width: 30vw;
        height: auto;
    }
</style>