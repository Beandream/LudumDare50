import { toGridPositions } from "../functions/toGridPositions.js";
export class Blocks {
    constructor() {
        this.init = (scene, id) => {
            this.scene = scene;
            this.scene.blocks = this;
            this.id = id;
            this.sprites = this.scene.physics.add.staticGroup();


            this.highlightBlock = scene.add.image(300, 700, 'null').setAlpha(0.5).setOrigin(0, 0);
            this.highlightBlock.setVisible(false);
        }

        this.create = (x = 0, y = 0, props = {}) => {
            let pos = toGridPositions(x, y);

            let block = this.sprites.create(pos.x, pos.y, props.texture ? props.texture : 'platformSquare');

            block.setScale(props.scale ? props.scale : 1);
            block.setInteractive().setOrigin(0, 0).refreshBody();

            block.on('pointerup', function (pointer) {
                //tell original sprite to disable itself

                // sprite.disableBody(true, true);
            });
        }

        this.disableHighlight = () => {
            this.highlightBlock.setVisible(false);
        }

        this.updateHighlight = (block) => {

            if (block) {
                let pos = toGridPositions(this.scene.input.activePointer.worldX, this.scene.input.activePointer.worldY);
                this.highlightBlock.setPosition(pos.x, pos.y);
                this.highlightBlock.setTexture(block.texture)
                this.highlightBlock.setScale(block.defaults.scale);
                this.highlightBlock.setVisible(true);
            }
        }
    }
}