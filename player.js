import { Square } from "./components/items/square.js";
export class Player {
    constructor() {
        this.init = (scene, cursors, id) => {
            this.scene = scene;
            this.cursors = cursors;
            this.id = id;
        }
        this.create = (x, y, props = {}) => {
            this.sprite = this.scene.physics.add.sprite(x, y, 'dude');
            this.sprite.setBounce(0.1);
            // this.sprite.setCollideWorldBounds(true);
            this.sprite.body.setGravityY(300);
            this.gravity = props.gravity ? props.gravity : 0;

            this.scene.anims.create({
                key: 'left',
                frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });

            this.scene.anims.create({
                key: 'turn',
                frames: [{ key: 'dude', frame: 4 }],
                frameRate: 20
            });

            this.scene.anims.create({
                key: 'right',
                frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            });
            let square = new Square(this.scene, "square1");
            square.init(400, 550, this.sprite.x, this.sprite.y);
            this.hand = square;
        }
        this.inventory = [];

        this.update = (pointer) => {

            if (this.hand) {
                this.hand.active = true;
                this.hand.update(this.sprite.x, this.sprite.y, pointer);
            }

            if (this.cursors.left.isDown) {
                this.sprite.setVelocityX(-360);

                this.sprite.anims.play('left', true);
            }
            else if (this.cursors.right.isDown) {
                this.sprite.setVelocityX(360);

                this.sprite.anims.play('right', true);
            }
            else {
                this.sprite.setVelocityX(0);

                this.sprite.anims.play('turn');
            }

            if (this.cursors.up.isDown) {
                if (this.sprite.body.touching.down) {
                    this.sprite.setVelocityY(-1000);
                }
                this.sprite.body.gravity.y = this.gravity - 3200;
            } else {
                this.sprite.body.gravity.y = this.gravity;
            }
        }
    }
}