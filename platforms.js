export class Platforms {
    constructor() {
        this.init = (scene, cursors, id) => {
            this.scene = scene;
            this.cursors = cursors;
            this.id = id;

            this.sprites = scene.physics.add.staticGroup();

            this.highlightBlock = scene.add.image(300, 700, 'platformSquare').setOrigin(0, 0);
            this.highlightBlock.setVisible(false);
        }

        this.create = (x, y, props = {}) => {
            let textureTypes = ["platformSquare", "platformTall", "platformWide"];

            let xGrid = Math.floor(x / 75);
            let yGrid = Math.floor(y / 75);

            let texture = textureTypes[props.type ? props.type : 0];
            if (props.texture) texture = props.texture;
            let sprite = this.sprites.create(xGrid * 75, yGrid * 75, texture);
            sprite.setScale(props.scale ? props.scale : 1);
            sprite.setInteractive();
            sprite.setOrigin(0, 0);
            sprite.refreshBody();

            sprite.on('pointerup', function (pointer) {
                sprite.disableBody(true, true);

            });
        }

        this.setHighlight = (val = false, pointer) => {
            this.highlight = val;
            this.startPosX = pointer?.worldX;
        }

        this.update = () => {
            if (this.highlight) {
                let x = this.scene.input.activePointer.worldX;
                let y = this.scene.input.activePointer.worldY;

                let xGrid = Math.floor(x / 75);
                let yGrid = Math.floor(y / 75);

                let size = Math.abs(this.startPosX - x);
                if (size < 50) this.highlightBlock.setTexture("platformSquare");
                if (size > 50) this.highlightBlock.setTexture("platformTall");
                if (size > 100) this.highlightBlock.setTexture("platformWide");

                this.highlightBlock.setPosition(xGrid * 75, yGrid * 75);
                this.highlightBlock.setVisible(true);
            } else {
                this.highlightBlock.setVisible(false);
            }
        }
    }
}