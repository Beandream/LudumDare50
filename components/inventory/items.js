import { WoodenBox } from "../items/blocks/woodenBox.js";

export const getItemsById = (id, scene) => {
    return Items[id].create(scene);
}


const Items = {
    0: {
        create: (scene) => {
            return WoodenBox(scene);
        }
    },
    1: {
        create: (scene) => {
            return WoodenBox(scene);
            // return new Square(scene)
        }
    }
}