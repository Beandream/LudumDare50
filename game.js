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

    let sky = this.add.image(400, 300, 'sky').setInteractive().setScrollFactor(0);

    platforms.init(this, cursors, "platforms");
    platforms.create(360, 700);
    platforms.create(600, 400, {type: 1});
    platforms.create(50, 250, {type: 1});
    platforms.create(750, 220, {type: 2});

    sky.on('pointerup', function (pointer) {
        platforms.setHighlight(false);
        let type = 0;
        let size = Math.abs(pointer.downX - pointer.upX);
        if (size < 50) type = 0;
        if (size > 50) type = 1;
        if (size > 100) type = 2;


        platforms.create(pointer.worldX, pointer.worldY, { type: type });

    }, this);

    sky.on('pointerdown', function (pointer) {
        platforms.setHighlight(true, pointer);

    }, this);

    player.init(this, cursors, "player");
    player.create(350, 450, { gravity: 3200 });

    this.physics.add.collider(player.sprite, platforms.sprites);

    this.cameras.main.setSize(800, 600);
    this.cameras.main.startFollow(player.sprite);

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
    scoreText.setScrollFactor(0);


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
    platforms.update();
}