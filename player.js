export class Player {
    constructor() {
        this.create = (scene, x, y, props) => {
            this.sprite = scene.physics.add.sprite(x, y, 'dude');
            this.sprite.setBounce(0.1);
            this.sprite.setCollideWorldBounds(true);
            this.sprite.body.setGravityY(300);
            this.gravity = props.gravity ? props.gravity : 0;

            scene.anims.create({
                key: 'left',
                frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });

            scene.anims.create({
                key: 'turn',
                frames: [{ key: 'dude', frame: 4 }],
                frameRate: 20
            });

            scene.anims.create({
                key: 'right',
                frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            });
        }

        this.update = (cursors) => {
            if (cursors.left.isDown) {
                this.sprite.setVelocityX(-360);

                this.sprite.anims.play('left', true);
            }
            else if (cursors.right.isDown) {
                this.sprite.setVelocityX(360);

                this.sprite.anims.play('right', true);
            }
            else {
                this.sprite.setVelocityX(0);

                this.sprite.anims.play('turn');
            }

            if (cursors.up.isDown) {
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