import { Setup } from "./config.js";
import { Player } from "./player.js";
import { Preload } from "./preload.js";


const game = Setup(Preload, create, update)

const player = new Player();

var platforms, cursors, stars, score = 0, scoreText, bombs, gameOver;

function create() {
    cursors = this.input.keyboard.createCursorKeys();

    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player.create(this, 100, 450, {gravity: 3200});

    this.physics.add.collider(player.sprite, platforms);


    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.physics.add.collider(stars, platforms);
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

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player.sprite, bombs, hitBomb, null, this);

    function hitBomb(player, bomb) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }
}

function update() {
    player.update(cursors);
}