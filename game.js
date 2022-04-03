import { Setup } from "./config.js";
import { Preload } from "./preload.js";
import { Player } from "./player.js";
import { Platforms } from "./platforms.js";


const game = Setup(Preload, create, update)

const player = new Player();
const platforms = new Platforms();

var stars, score = 0, scoreText, bombs, gameOver;

function create() {
    const cursors = this.input.keyboard.createCursorKeys();

    let sky = this.add.image(400, 300, 'sky').setInteractive();

    platforms.init(this, cursors, "platforms");
    platforms.create(400, 568, { scale: 2 });
    platforms.create(600, 400);
    platforms.create(50, 250);
    platforms.create(750, 220);

    sky.on('pointerup', function (pointer) {
        console.log(pointer);
        let size = Math.abs(pointer.downX - pointer.upX);
        size = size / 100;
        if (size < 0.1) size = 0.1;

        platforms.create(pointer.x, pointer.y, { scale: size });

    }, this);

    player.init(this, cursors, "player");
    player.create(100, 450, { gravity: 3200 });

    this.physics.add.collider(player.sprite, platforms.sprites);


    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.physics.add.collider(stars, platforms.sprites);
    this.physics.add.overlap(player.sprite, stars, collectStar, null, this);

    function collectStar(player, star) {
        star.disableBody(true, true);
    }

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });


    function collectStar(p, star) {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0) {
            stars.children.iterate(function (child) {
                let rnd = Math.random();
                let x = child.x;
                x += ((rnd * 200) / 2);
                if (x < 0 || x > 800) x = 800 * rnd;

                child.enableBody(true, x, 0, true, true);

            });

            var x = (p.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
    }

    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms.sprites);

    this.physics.add.collider(player.sprite, bombs, hitBomb, null, this);

    function hitBomb(player, bomb) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }
}

function update() {
    player.update();
}