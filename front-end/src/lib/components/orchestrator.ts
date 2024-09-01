import { writable, type Writable } from 'svelte/store';

const poser = writable(null);

export default class Orchestrator {
    private static _instance: Orchestrator = null; // Singleton instance

    private constructor() 
        {
            let is_mobile = false;
            let shopping_cart = [];

            // Initialize store
            poser.set({
                is_mobile: is_mobile,
                shopping_cart: shopping_cart
            });
        }

    public static get instance(): Orchestrator 
        {
            if (Orchestrator._instance === null) {
                Orchestrator._instance = new Orchestrator();
            }
            return Orchestrator._instance;
        }

    get store(): Writable<any> { return poser; }

    get is_mobile(): boolean 
        {
            let im = false;
            poser.subscribe(p => { im = p.is_mobile; });
            return im;
        }
    
    set is_mobile(value: boolean) 
        { poser.update(p => { return { ...p, is_mobile: value }; }); }

    get cart_count(): number
        {
            let cc = 0;
            poser.subscribe(p => { cc = p.shopping_cart.length; });
            return cc;
        }
    
    get shopping_cart(): any
        {
            let sc = {};
            poser.subscribe(p => { sc = p.shopping_cart; });
            return sc;
        }

    set shopping_cart(value: any)
        { poser.update(p => { return { ...p, shopping_cart: value }; }); }

    addToCart = (item: any) =>
        {
            let cart = this.shopping_cart;
            let product_found = false;

            let quantity = item.quantity;
            let category = item.category;
            let selected_size = item.size;
            let selected_color = item.color;
            let product_name = item.product;

            if (quantity < 1) { return 'quantity'; }

            switch (category) {
                case 'Clothing':
                    if (selected_size === undefined) { return 'size'; }
                    if (selected_color === undefined) { return 'color'; }
                    
                    cart.forEach((product: any) => {
                        if (product.product == product_name && product.color == selected_color && product.size == selected_size) {
                            alert('Found: ' + product.product + ' ' + product.color + ' ' + product.size);
                            product.quantity += quantity;
                            product_found = true;
                        }
                    });
                case 'Book':
                    // TODO: Add Product ID
                    cart.forEach((product: any) => {
                        if (product.product == product_name) {
                            product.quantity += quantity;
                            product_found = true;
                            return;
                        }
                    });

                    if (product_found) {
                        this.shopping_cart = cart;
                        return 'updated';
                    }

                    this.shopping_cart = [...cart, item ];
                    return 'added';
            }
        }
}