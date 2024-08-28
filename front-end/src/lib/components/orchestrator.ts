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
}