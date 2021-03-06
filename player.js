import { Inventory } from "./components/inventory/inventory.js";

export class Player {
    constructor() {
        this.init = (scene, cursors, id) => {
            this.scene = scene;
            this.cursors = cursors;
            this.id = id;

            this.inventory = new Inventory(this.scene, "playerInventory", 9);

        }
        this.create = (x, y, props = {}) => {
            this.sprite = this.scene.physics.add.sprite(x, y, 'dude').setDepth(1);
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
            // let square = new Square(this.scene, "square1");
            // square.init(400, 550, this.sprite.x, this.sprite.y);
            // this.hand = square;

            // this.inventory.collectItem(new WoodenBox(this.scene));
            console.log(this.inventory);
            this.inventory.addItem(0, 20);
            this.inventory.addItem(1, 11);
            this.inventory.addItem(2, 11);
            this.inventory.addItem(10, 5);
            this.inventory.addItem(1, 1);

            // this.inventory.dropItem(0, 64);
        }

        this.useItem = (pointer) => {
            this.inventory.useItem(this.sprite.x, this.sprite.y, pointer);
        }

        this.reset = () => {
            this.inventory = new Inventory(this.scene, "playerInventory", 9);
        }

        this.update = (pointer) => {

            this.inventory.updateItem(this.sprite.x, this.sprite.y, pointer);

            if (this.cursors.left.isDown || this.cursors.left2.isDown) {
                this.sprite.setVelocityX(-360);

                this.sprite.anims.play('left', true);
            }
            else if (this.cursors.right.isDown || this.cursors.right2.isDown) {
                this.sprite.setVelocityX(360);

                this.sprite.anims.play('right', true);
            }
            else {
                this.sprite.setVelocityX(0);

                this.sprite.anims.play('turn');
            }

            if (this.cursors.up.isDown || this.cursors.space.isDown || this.cursors.up2.isDown) {
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