export class Square {
    constructor(scene, id, amount) {
        this.scene = scene;
        this.id = id;
        this.itemTexture = 'block';
        this.blockTexture = 'block';
        this.type = "block";
        this.amount = amount;

        this.init = (x, y, px, py, amount) => {
            this.item = this.scene.add.image(px, py, this.itemTexture).setScale(0.2);
            this.uiHand = this.scene.add.image(x, y, this.itemTexture).setScale(0.5).setScrollFactor(0);
            this.uiAction = this.scene.add.image(px, py, this.itemTexture).setScale(0.75).setAlpha(0.5).setOrigin(0, 0);
            this.amountText = this.scene.add.text(x + 15, y - 45, this.amount, { fontSize: '32px', fill: '#000', fontStyle: 'bold', }).setScrollFactor(0);
        }


        this.update = (x, y, pointer) => {
            this.item.x = x;
            this.item.y = y;

            if (pointer) {
                let xGrid = Math.floor(pointer.worldX / 75);
                let yGrid = Math.floor(pointer.worldY / 75);
                this.uiAction.x = xGrid * 75;
                this.uiAction.y = yGrid * 75;
            }
        }

        this.use = (x, y, pointer) => {
            this.scene.platforms.create(pointer.worldX, pointer.worldY, { texture: this.blockTexture, scale: 0.75 });
            this.amount -= 1;
            this.amountText.setText(this.amount);
        }

        this.disable = () => {
            this.item.destroy();
            this.uiHand.destroy();
            this.uiAction.destroy();
            this.amountText.destroy();
            //disble stuff idk?
        }
    }
}