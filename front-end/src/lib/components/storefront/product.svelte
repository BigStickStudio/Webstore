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
        border: 1px solid black;
        width: 370px;
        height: 40ch;
        border-radius: 2rem;
        margin: 1rem 1rem 0 1rem;
        overflow: hidden;
        transition: border-color 0.3s, background-color 0.5s;
    }

    div.img-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 1rem;
    }

    main:hover {
        background-color: #FFFFFF;
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
        transform: scale(1.3) translate(0, -25px);
        opacity: 0.9;
        z-index: 0;
        transition: transform 500ms ease-out;
    }
</style>