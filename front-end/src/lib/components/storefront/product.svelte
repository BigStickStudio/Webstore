<script>
    export let product_name = "";
    export let images = undefined;
    let image = images.find((image) => image.includes('front'));
</script>

<main>
    <div id="title">
        {product_name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
    </div>
    
    <div class="img-container">
        {#if image}
            <img src={image} alt={product_name} />
        {/if}
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        height: 350px;
        border: 1px solid black;
        border-radius: 2rem;
        margin: 1rem 1rem 0 1rem;
        overflow: hidden;
        transition: border-color 0.3s, background-color 0.5s;
        background-color: #FFFFFF;
        box-shadow: 1px 1px 5px #28483435;
    }

    div.img-container {
        width: 300px;
        margin: 1rem;
    }

    main:hover {
        border-color: rgba(185, 212, 150, 0.467);
        transition: border-color 0.3s, background-color 0.5s;
    }

    div#title {
        padding: 0.5rem 0 0 2rem;
        font-family: "Noto Sans", sans-serif;
        font-optical-sizing: auto;
        font-weight: 500;
        font-style: normal;
        font-size: 1.25rem;
        font-variation-settings:
            "wdth" 100;
        z-index: 1;
        background-color: #ffffff38;
        text-shadow: 0 0 2px #FFFFFF80;
    }

    img {
        border-radius: 1rem;
        width: auto;
        height: auto;
        transition: transform 0.5s;
    }

    img:hover {
        border-radius: 1rem;
        transform: scale(1.3) translate(0, -15px);
        opacity: 0.9;
        z-index: 0;
        transition: transform 500ms ease-out;
    }
</style>