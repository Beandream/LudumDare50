export class Platforms {
    constructor() {
        this.init = (scene, cursors, id) => {
            this.scene = scene;
            this.cursors = cursors;
            this.id = id;

            this.sprites = scene.physics.add.staticGroup();
        }

        this.create = (x, y, props = {}) => {
            let sprite = this.sprites.create(x, y, 'ground').setScale(props.scale ? props.scale : 1).refreshBody().setInteractive();

            sprite.on('pointerup', function (pointer) {
                sprite.disableBody(true, true);
        
            });
        }

        this.update = () => {

        }
    }
}