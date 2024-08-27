<script lang="ts">
    import product_listing from "$assets/product-listing.json"
    import { moveListener, releaseListener } from "$components/storefront/product_fn"
    import Button from "$components/ui/button/button.svelte"
    import * as Select from "$components/ui/select/index.js"
    import { color_map, product_map } from "@/lib/components/utils"
    import Back from "lucide-svelte/icons/chevron-left"
    import Forward from "lucide-svelte/icons/chevron-right"
    import Dot from "lucide-svelte/icons/dot"
    export let product: string;
    
    const product_details = product_listing[product];
    const product_name = product_details['name'];
    const sizes = product_details['sizes'];
    const prices = product_details['prices'];
    const colors = product_details['colors'];

    let min_price = Math.min(...prices);
    let max_price = Math.max(...prices);
    let single_price = prices.length == 1 || max_price == min_price;
    let price = single_price ? prices[0] : `${min_price} - ${max_price}`;
    let product_meta: any = product_map[product];
    let images: Array<string> = Object.keys(product_meta);
    let selected_image: number = 0;
    let selected_color: string = colors ? colors[0] : '';
    let filtered_images: Array<string> = images;

    const filterByColor = (selected: string) => {
        selected_color = selected;
        let color_key: string = selected.replace(' ', '-').toLowerCase();
        filtered_images = images.filter(color => color.includes(color_key));
        console.log("Selected color: ", selected_color);
        console.log("Filtered images: ", filtered_images);
    }

    if (colors?.length > 0) 
        { filterByColor(selected_color); }

    let filtered_image_count: number = filtered_images.length;

    const setDescription = (e: HTMLElement) => 
        { e.innerHTML = product_details['description']; }

    const selectSize = (e: HTMLElement) => {
        console.log("Selected size: ", e);
        price = product_details['prices'][sizes.indexOf(e)];
    }

    const addToCart = (e: any) => {
        e.preventDefault();
        alert('Added to cart');
        let cart = localStorage.getItem('cart');
        let cart_obj = cart ? JSON.parse(cart) : {};
        let cart_item = cart_obj[product] || 0;
        cart_obj[product] = cart_item + 1;
        localStorage.setItem('cart', JSON.stringify(cart_obj));
    }
</script>

<main>
    <Button variant="outline" on:click={() => history.back()}>
        <Back />
    </Button>

    <div class="container mx-auto p-3 flex flex-col">
        <div id="product-container" class="mx-auto">
            <div id="flex-buffer">
                <div id="image-container">
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div id="image-preview"
                        on:mousedown={moveListener}
                        on:mouseup={releaseListener}>
                        <img id="image" 
                            src={filtered_images[selected_image]} 
                            alt={filtered_images[selected_image]} />
                    </div>

                    <div id="spanner" class="flex justify-center my-auto">
                        {#if filtered_image_count > 0}
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <a id="selector" 
                                on:click={() => selected_image = (selected_image - 1 + filtered_image_count) % filtered_image_count}>
                                <Back class="h-5 w-5"/>
                            </a>

                            {#each filtered_images as _, index}
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
                            <a id="selector" on:click={() => selected_image = (selected_image + 1) % filtered_image_count}>
                                <Forward  class="h-5 w-5"/>
                            </a>

                        {:else}
                            <p>No images available</p>
                        {/if}
                    </div>
                </div>
            </div>

            <div id="product-details" class="flex flex-col">
                <div class="row">
                    <h1 class="text-center text-4xl mr-auto">{product_name}</h1>
                    <br>
                </div>
                <hr style="height: 2px; background-color: gray;">

                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="flex flex-col px-3 my-3">
                    <div class="flex flex-row  items-center">
                        Price: 
                        <p class="px-2" style="font-size: 1.2rem; color: #cf2300;"><b>
                            ${price}
                        </b></p>
                    </div>

                {#if colors?.length > 0}
                    <div class="flex flex-col my-3">
                        <p>Colors:</p>
                        <div class="flex flex-row">
                            {#each colors as color}
                                {#if color == selected_color}
                                    <div class="mx-1">
                                        <div id="selected_color" class="h-6 rounded-full" style="background-color: {color_map[color]};">
                                            {#if parseInt(color_map[color].slice(1), 16) < 0xffffff / 2}
                                                <p class="px-3" style="color: white;">{color}</p>
                                            {:else}
                                                <p class="px-3">{color}</p>
                                            {/if}
                                        </div>
                                    </div>
                                {:else}
                                    <div class="mx-1">
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <div id="unselected_color" 
                                             class="h-6 rounded-full" 
                                             style="background-color: {color_map[color]};"
                                             on:click={() => filterByColor(color)}
                                             >
                                            {#if parseInt(color_map[color].slice(1), 16) < 0xffffff / 2}
                                                <p class="px-3" style="color: white;">{color}</p>
                                            {:else}
                                                <p class="px-3">{color}</p>
                                            {/if}
                                        </div>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                {/if}

                    <div class="flex flex-row">
                        {#if sizes?.length > 0}
                            <div class="flex flex-col">
                                <p>Size:</p>
                                <Select.Root portal={null}>
                                    <Select.Trigger class="w-[180px]">
                                        <Select.Value placeholder="Select Size" />
                                    </Select.Trigger>
                                    <Select.Content>
                                        <Select.Group>
                                            {#each sizes as size}
                                                <Select.Item value={size} label={size} on:click={() => selectSize(size)}>
                                                    {size}
                                                </Select.Item>
                                            {/each}
                                        </Select.Group>
                                    </Select.Content>
                                </Select.Root>
                            </div>
                        {/if}

                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div class="flex ml-auto items-end" >  
                            <div id="button" on:click={addToCart}>
                                Add to Cart
                            </div>
                        </div>
                    </div>
                </div>

                <hr style="height: 2px; background-color: gray;">

                <div class="p-5">
                    <p class="text-lg font-semibold">Description:</p>
                    <div id="description" class="p-3" use:setDescription />
                </div>

            </div>
        </div> 
    </div>
</main>

<style>
    div#product-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 1rem;
    }

    div#button {
        border: 1px solid black;
        border-radius: 0.75rem;
        font-family: "Noto Sans", sans-serif;
        font-optical-sizing: auto;
        padding: 0.25rem 0.75rem;
        background-color: #10ba4e;
        border-color: #284834;
        transition: background-color 0.25s;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-weight: 500;
        box-shadow: 1px 1px 2px #28483485;
    }

    div#button:hover {
        background-color: #02ae2a;
        box-shadow: 1px 1px 3px #28483495;
        transition: background-color 0.25s;
    }

    div#button:active {
        background-color: #30cb2db0;
        transition: background-color 0.25s;
    }

    div#selected_color {
        border-radius: 1rem;
        border: 1px solid black;
        box-shadow: 1px 1px 2px #28483435;
    }

    div#unselected_color {
        box-shadow: 1px 1px 2px #28483435;
    }

    div#unselected_color:hover {
        border: 1px solid rgba(113, 146, 113, 0.377);
        filter:brightness(0.9);
        transition: filter 0.25s;
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
        height:auto;
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
        width: 50vw;
        height:auto;
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
        width: 40vw;
        height: auto;
        max-height:75vh;
        margin-right: 2.5rem;
        margin-left: -5rem;
    }

    img {
        border-radius: 1rem;
        max-height: 70vh;
    }
</style>