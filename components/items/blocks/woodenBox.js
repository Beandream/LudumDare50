export class WoodenBox {
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

function newObject (scene, id) {
    return new WoodenBox(scene, id)
}