<script lang="ts">
    import product_listing from "$assets/product-listing.json"
    import { moveListener, releaseListener } from "$components/storefront/product_fn"
    import Button from "$components/ui/button/button.svelte"
    import * as Select from "$components/ui/select/index.js"
    import Orchestrator from "@/lib/components/orchestrator"
    import { color_map, product_map } from "@/lib/components/utils"
    import { params } from '@roxi/routify'
    import Back from "lucide-svelte/icons/chevron-left"
    import Forward from "lucide-svelte/icons/chevron-right"
    import Dot from "lucide-svelte/icons/dot"
    export let product: string;

    const orchestrator = Orchestrator.instance;
    
    const product_details = product_listing[product];
    const product_name = product_details['name'];
    const sizes = product_details['sizes'];
    const prices = product_details['prices'];
    const colors = product_details['colors'];
    const category = product_details['category'];

    let min_price = Math.min(...prices);
    let max_price = Math.max(...prices);
    let single_price = prices.length == 1 || max_price == min_price;
    let price = single_price ? prices[0] : `${min_price} - ${max_price}`;
    let product_meta: any = product_map[product];
    let images: Array<string> = Object.keys(product_meta);

    let selected_image: number = 0;
    let selected_color: string = $params.color ? $params.color : colors ? colors[0] : undefined;
    let selected_size: string = undefined;

    let filtered_images: Array<string> = images;
    let quantity: number = 1;

    const filterByColor = (selected: string) => {
        selected_color = selected;
        let color_key: string = selected.replace(' ', '-').toLowerCase();
        filtered_images = images.filter(color => color.includes(color_key));
    }

    if (colors?.length > 0) 
        { filterByColor(selected_color); }

    let filtered_image_count: number = filtered_images.length;

    const setDescription = (e: HTMLElement) => 
        { e.innerHTML = product_details['description']; }

    const selectSize = (size: string) => {
        selected_size = size;
        price = product_details['prices'][sizes.indexOf(size)];
    }

    // TODO: Abstract some of this out to the orchestrator
    const addToCart = (e: any) => {
        e.preventDefault();

        let selected_item = {
                    product_name: product,
                    product: product_name, // Don't ask why we swaped these two
                    color: selected_color,
                    size: selected_size,
                    price: price,
                    quantity: quantity,
                    category: category,
                    image: filtered_images.filter(image => image.includes('front'))
                };

        // TODO: Implement custom modal
        switch (orchestrator.addToCart(selected_item)) {
            case "quantity":
                alert('Please select a valid quantity.'); ;
                break;
            case 'size':
                alert('Please select a size.');
                break;
            case 'color':
                alert('Please select a color');
                break;
            case 'added':
                if (category == "Clothing") 
                    { alert(`Added ${selected_color} ${product_name}, ${selected_size} to cart`) } 
                else if (category == "Books") 
                    { alert(`Added ${product_name} to cart`) }
                break;
            case 'updated':
                if (category == "Clothing") 
                    { alert(`Updated ${selected_color} ${product_name}, ${selected_size} in cart`) } 
                else if (category == "Books") 
                    { alert(`Updated ${product_name} to cart`) }
                break;
            default:
                alert("Error adding item to cart");
        }
    }
</script>

<main class="flex flex-col">
    <div id="back">
        <Button variant="outline" 
                on:click={() => history.back()}>
            <Back />
        </Button>
    </div>
    
    <div id="product-container">
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

        <div id="product-details">
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
                    <div id="color-container">
                        {#each colors as color}
                            {#if color == selected_color}
                                <div id="selected_color" class="h-6 rounded-full" style="background-color: {color_map[color]};">
                                    {#if parseInt(color_map[color].slice(1), 16) < 0xffffff / 2}
                                        <p id="color" class="justify-center px-3" style="color: white;">{color}</p>
                                    {:else}
                                        <p id="color" class="justify-center px-3">{color}</p>
                                    {/if}
                                </div>
                            {:else}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <div id="unselected_color" 
                                        class="h-6 rounded-full" 
                                        style="background-color: {color_map[color]};"
                                        on:click={() => filterByColor(color)}
                                        >
                                    {#if parseInt(color_map[color].slice(1), 16) < 0xffffff / 2}
                                        <p id="color" class="px-3 justify-center" style="color: white;">{color}</p>
                                    {:else}
                                        <p id="color" class="px-3 justify-center">{color}</p>
                                    {/if}
                                </div>
                            {/if}
                        {/each}
                    </div>
                </div>
            {/if}

                <div id="sq-container">
                    {#if sizes?.length > 0}
                        <div id="size-container">
                            <p>Size:</p>
                            <div class="mx-3">
                                <Select.Root portal={null}>
                                    <Select.Trigger class="w-[8rem]">
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
                        </div>
                    {/if}

                    <div id="quantity-container">
                        <p>Quantity:</p>

                        <div class="flex flex-row gap-x-1 mx-3">
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <div id="quantity" class="w-8" on:click={() => { quantity -= 1; }}>-</div>
                            <input type="number" id="quantity-input" value={quantity} />
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <div id="quantity" class="w-8" on:click={() => { quantity += 1; }}>+</div>
                        </div>
                    </div>
                </div>

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="flex my-3 w-full" >  
                    <div id="button" class="flex w-full justify-center" on:click={addToCart}>
                        Add to Cart
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
        background-color: #10ba4ec1;
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

    p#color {
        margin: 0 0.5rem;
        white-space: nowrap;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    div#color-container {
        display: block;
        position: relative;
    }

    div#selected_color {
        margin: 0.25rem 0.25rem;
        display: inline-block;
        position: relative;
        width: auto;
        border-radius: 1rem;
        border: 1px solid black;
        box-shadow: 1px 1px 2px #28483435;
    }

    div#unselected_color {
        margin: 0.25rem 0.25rem;
        display: inline-block;
        position: relative;
        border: 1px solid transparent;
        box-shadow: 1px 1px 2px #28483435;
    }

    div#unselected_color:hover {
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(113, 146, 113, 0.377);
        filter:brightness(1.05);
        transition: filter 0.25s;
    }

    a#unselected {
        display: flex;
        align-items: center;
    }

    a#unselected:hover {
        display: flex;
        align-items: center;
        color:rgba(183, 192, 189, 0.478)16;
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

    div#back {
        margin-left: -2rem;
        width: 10rem;
    }

    div#image-container {
        display: flex;
        flex-direction: column;
        background-color: white;
        border: 1px solid black;
        border-radius: 1rem;
        z-index: 1;
        overflow: hidden;
        padding: 1rem;
        width: 45vw;
        max-width: 37rem;
        height: auto;
        max-height:75vh;
        margin-right: 2rem;
        margin-left: -3rem;
    }

    div#product-details {
        display: flex;
        flex-direction: column;
        width: 55vw;
        z-index: 1;
        height:auto;
        padding: 1rem;
    }

    img {
        border-radius: 1rem;
        max-height: 70vh;
    }

    div#quantity {
        display:flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgba(176, 176, 176, 0.358);
        border-radius: 0.35rem;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        padding: 0.25rem;
    }

    div#quantity:hover {
        cursor: pointer;
        filter: brightness(1.05);
        transition: filter 0.25s;
    }

    div#sq-container {
        display: block;
        position: relative;
        width: 100%;
    }

    div#size-container {
        display: inline-block;
        position: relative;
        margin-bottom: 1rem;
        margin-right: 7vw;
    }

    div#quantity-container {
        display: inline-block;
        position: relative;
        width: 15rem;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input {
        display: flex;
        text-align: center;
        border-radius: 0.5rem;
         width: 25%;
        padding: 0.25rem;
        -moz-appearance: textfield;
        appearance: textfield;
    }
</style>