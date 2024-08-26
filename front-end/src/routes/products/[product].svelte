<script lang="ts">
    export let product: string;
    const product_map = {
        "ascetic-media": import.meta.glob("$assets/ascetic-media/*.png"),
        "culture-heritage-legacy": import.meta.glob("$assets/culture-heritage-legacy/*.png"),
        "roosevelt": import.meta.glob("$assets/roosevelt/*.png"),
    }

    const product_images: any = product_map[product];

    console.log("Product Images: ", product_images);
</script>

<div class="container mx-auto p-10">
    <h1 class="text-center text-4xl">{product}</h1>

    {#each Object.keys(product_images) as image}
        <img src={image} alt={image} />
    {/each}
</div>
