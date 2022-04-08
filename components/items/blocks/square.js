export class Square {
    constructor(scene, id) {
        this.scene = scene;
        this.id = id;
        this.texture = "platformSquare"
        this.type = "block";
        this.defaults = {
            scale: 1
        }

        this.init = (x, y, px, py) => {
        }

        this.update = (x, y, pointer) => {
            if (pointer) {
                this.scene.blocks.updateHighlight(this);
            }
        }

        this.use = (x, y, pointer) => {
            let props = {
                texture: this.texture,
                scale: this.defaults.scale
            }
            this.scene.blocks.create(pointer.worldX, pointer.worldY, props);
        }

        this.disableHighlight = () => {
            this.scene.blocks.disableHighlight(this);
        }
    }
}