<script lang="ts">
    import Button from "$components/ui/button/button.svelte"
    import { product_map } from "@/lib/components/utils"
    import Back from "lucide-svelte/icons/chevron-left"
    import Forward from "lucide-svelte/icons/chevron-right"
    import Dot from "lucide-svelte/icons/dot"
    export let product: string;
    
    const product_name = product.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    let product_meta: any = product_map[product];
    let products: Array<string> = Object.keys(product_meta);
    let selected_image: number = 0;
    let image_count: number = products.length;

    const handleMove = (image, e) => {
        const { left, top, width, height } = image.getBoundingClientRect();
        const x = width / 2 - (e.clientX - left);
        const y = height / 2 - (e.clientY - top);
        console.log(x, y);
        image.style.transform = `translate(${x / 5}px, ${y / 5}px)`;
        image.style.scale = '3';
        image.style.transition = 'scale 0.5s';
    }

    const moveHandler = (e) => {
        e.preventDefault();
        const image = document.getElementById('image');
        handleMove(image, e);
    }

    const moveListener = (e) => {
        e.preventDefault();

        const image = document.getElementById('image');
        handleMove(image, e);

        image.addEventListener('mousemove', moveHandler);

        image?.addEventListener('mouseleave', () => {
            image.style.transform = 'translate(0, 0)';
            image.style.scale = '1';
            image.style.transition = 'scale 0.5s';
        });
    }

    const releaseListener = (e) => {
        const image = document.getElementById('image');
        image.style.transform = 'translate(0, 0)';
        image.style.scale = '1';
        image.style.transition = 'scale 0.5s';
        image.removeEventListener('mousemove', moveHandler);
    };
</script>

<main>
    <Button variant="outline" on:click={() => history.back()}>
        <Back />
    </Button>

    <div class="container mx-auto p-10 flex flex-col">
        <h1 class="text-center text-4xl mr-auto">{product_name}</h1>

        <div id="product-container">
            <div id="image-container">
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div id="image-preview"
                     on:mousedown={moveListener}
                     on:mouseup={releaseListener}>
                    <img id="image" 
                         src={products[selected_image]} 
                         alt={products[selected_image]} />
                </div>

                <div id="spanner" class="flex justify-center align-center">
                    {#if image_count > 0}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <a id="selector" 
                            on:click={() => selected_image = (selected_image - 1 + image_count) % image_count}>
                            <Back class="h-5 w-5"/>
                        </a>

                        {#each products as _, index}
                            {#if index == selected_image}
                                <span id="selected">
                                    <Dot class="h-6 w-6"/>
                                </span>
                            {:else}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <a id="unselected" on:click={() => selected_image = index}>
                                    <Dot class="h-4 w-4"/>
                                </a>
                            {/if}
                        {/each}

                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <a id="selector" on:click={() => selected_image = (selected_image + 1) % image_count}>
                            <Forward  class="h-5 w-5"/>
                        </a>

                    {:else}
                        <p>No images available</p>
                    {/if}
                </div>
            </div>

            <div id="product-details" class="flex flex-col">
                <p>Product Details</p>
            </div>
        </div> 
    </div>
</main>

<style>
    div#product-container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding: 1rem;
    }

    a#unselected {
        display: flex;
        align-items: center;
    }

    a#unselected:hover {
        color:rgb(107, 118, 115)16;
    }

    span#selected {
        display: flex;
        align-items: center;
    }

    a#selector {
        display: flex;
        align-items: center;
    }

    div#image-preview {
        display: flex;
        justify-content: center;
        overflow: hidden;
        border-radius: 1rem;
    }

    div#image-preview:hover {
        cursor: -moz-zoom-in; 
        cursor: -webkit-zoom-in; 
        cursor: zoom-in;
    }

    div#spanner {
        padding: 0.5rem 0 0 0;
        z-index: 1;
    }

    div#product-details {
        z-index: 1;
        width: 30vw;
        padding: 1rem;
    }

    div#image-container {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        border-radius: 1rem;
        z-index: 1;
        overflow: hidden;
        padding: 1rem;
        width: 50vw;
    }

    img {
        border-radius: 1rem;
        max-height: 50vh;
    }
</style>