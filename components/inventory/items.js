import { Square } from "../items/blocks/square.js";
import { WoodenBox } from "../items/blocks/woodenBox.js";
import {WoodenBoxA} from "../items/blocks/woodenBoxA.js"

export const getItemsById = (id, scene) => {
    
    return Items[id](scene);
}


const Items = {
    0: (scene) => { return WoodenBox(scene)},
    1: (scene) => { return Square(scene)},
    2: (scene) => { return WoodenBoxA(scene)},
    10: (scene) => { return Square(scene)},
}