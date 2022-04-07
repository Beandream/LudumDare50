export class Square {
    constructor(scene, id) {
        this.scene = scene;
        this.id = id;
        this.texture = "block"
        this.type = "block";
        this.defaults = {
            scale: 0.75
        }

        this.init = (x, y, px, py) => {
            // this.uiHand = this.scene.add.image(x, y, this.itemTexture).setScale(0.5).setScrollFactor(0);
            // this.uiAction = this.scene.add.image(px, py, this.itemTexture).setScale(0.75).setAlpha(0.5).setOrigin(0, 0);
        }


        this.update = (x, y, pointer) => {
            if (pointer) {
                this.scene.blocks.update(this);
            }
        }

        this.use = (x, y, pointer) => {
            let props = {
                texture: this.texture,
                scale: this.defaults.scale
            }
            this.scene.blocks.create(pointer.worldX, pointer.worldY, props);
        }

        this.disable = () => {
            this.scene.blocks.disable(this);
            // this.uiHand.destroy();
            // this.uiAction.destroy();
            //disble stuff idk?
        }
    }
}