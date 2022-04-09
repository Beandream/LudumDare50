export const WoodenBox = (scene) => {
    const obj = {
        texture: "woodenBox",
        type: "block",
        scale: 0.75,

        updateItem: (x, y, pointer) => {
            if (pointer) {
                scene.blocks.updateHighlight(obj);
            }
        },

        disable: () => {
            scene.blocks.disableHighlight(obj);
        },

        useItem: (x, y, pointer, invetory, slotIndex) => {
            scene.blocks.create(pointer.worldX, pointer.worldY, { texture: obj.texture, scale: obj.scale });
            invetory.dropItem(slotIndex, 1);
            console.log(invetory.slots[slotIndex].quantity);
        }
    }
    return obj
}


export class WoodenBoxe {
    constructor(scene, id) {
        this.scene = scene;
        this.id = id;
        this.texture = "woodenBox"
        this.type = "block";
        this.defaults = {
            scale: 0.75
        }

        this.init = (x, y, px, py) => {
        }

        this.update = (x, y, pointer) => {
            if (pointer) {
                this.scene.blocks.updateHighlight(this);
            }
        }

        this.use = (x, y, pointer, inventory) => {
            let props = {
                texture: this.texture,
                scale: this.defaults.scale,
                inventory,
                newObject
            }
            this.scene.blocks.create(pointer.worldX, pointer.worldY, props);
        }

        this.disableHighlight = () => {
            this.scene.blocks.disableHighlight(this);
        }
    }
}

function newObject(scene, id) {
    return new WoodenBox(scene, id)
}