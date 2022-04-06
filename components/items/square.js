export class Square {
    constructor(scene, id) {
        this.scene = scene;
        this.id = id;
        this.itemTexture = 'block';
        this.active = false;

        this.init = (x, y, px, py) => {
            this.item = this.scene.add.image(px, py, this.itemTexture).setScale(0.2);
            this.uiHand = this.scene.add.image(x, y, this.itemTexture).setScale(0.5).setScrollFactor(0);
            this.uiAction = this.scene.add.image(px, py, this.itemTexture).setScale(0.75).setAlpha(0.5).setOrigin(0, 0);
        }


        this.update = (x, y, pointer) => {
            if (!this.active) return  //do passive item thing

            this.item.x = x;
            this.item.y = y;

            if (pointer) {
                let xGrid = Math.floor(pointer.worldX / 75);
                let yGrid = Math.floor(pointer.worldY / 75);
                this.uiAction.x = xGrid * 75;
                this.uiAction.y =yGrid * 75;
            }
        }

        this.use = (action) => {
            if (this.active) { //make sure we are holding it
                console.log(action);
            }
        }
    }
}