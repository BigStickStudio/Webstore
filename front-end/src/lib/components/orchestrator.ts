import { writable, type Writable } from 'svelte/store';

const poser = writable(null);

export default class Orchestrator {
    private static _instance: Orchestrator = null; // Singleton instance

    private constructor() 
        {
            let is_mobile = false;
            let cart_count = 0;

            // Initialize store
            poser.set({
                is_mobile: is_mobile,
                cart_count: cart_count
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
            poser.subscribe(p => { cc = p.cart_count; });
            return cc;
        }
    
    set cart_count(value: number)
        { poser.update(p => { return { ...p, cart_count: value }; }); }
}