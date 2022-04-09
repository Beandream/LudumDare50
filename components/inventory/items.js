import { Square } from "../items/blocks/square.js";
import { WoodenBox } from "../items/blocks/woodenBox.js";

export const getItemsById = (id, scene) => {
    
    return Items[id](scene);
}


const Items = {
    0: (scene) => { return WoodenBox(scene)},
    1: (scene) => { return Square(scene)},
    10: (scene) => { return Square(scene)},
}