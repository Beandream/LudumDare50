import { Setup } from "./config.js";
import { Preload } from "./preload.js";
import { Player } from "./player.js";
import { Platforms } from "./platforms.js";
import { Buttons } from "./components/ui/buttons.js";

const game = Setup(Preload, create, update)

const player = new Player();
const platforms = new Platforms();

var stars, score = 0, scoreText, bombs, gameOver, water;

function create() {
    const cursors = { ...this.input.keyboard.createCursorKeys(), ...this.input.keyboard.addKeys({ up2: 'W', left2: 'A', down2: 'S', right2: 'D' }) };

    const buttons = new Buttons(this, "buttons");

    let sky = this.add.image(400, 300, 'sky').setInteractive().setScrollFactor(0);
    water = this.physics.add.sprite(400, 1000, 'water').setScale(10, 1).refreshBody();
    water.body.setAllowGravity(false);



    platforms.init(this, cursors, "platforms");
    platforms.create(300, 608, { scale: 1 });
    platforms.create(600, 400);
    platforms.create(50, 250);
    platforms.create(750, 220);

    console.log(this);

    sky.on('pointerup', function (pointer) {
        player.useItem(pointer);
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

    this.physics.add.overlap(player.sprite, water, hitWater, null, this);

    function hitWater(p, water) {
        console.log("hit water");
        player.reset();
        this.scene.restart();
    }


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

    let raiseWater = () => {
        water.y -= 10;
        water.refreshBody();
    }


    function holdItem() {
    }

    buttons.create(770, 30, 'btnRaiseWater', { texture: "white", onClick: raiseWater });
    buttons.create(700, 30, 'btnHoldItem', { texture: "white", onClick: holdItem });

    buttons.create(500, 30, 'btnGiveSquareItem', { texture: "white", onClick: () => {}});
    buttons.create(575, 30, 'btnGiveWoodenBoxItem', { texture: "white", onClick: () => {}});

}

function update() {

    // if ((water.y - player.sprite.y) > 400) {
    //     water.y -= 0.1;
    //     water.refreshBody();
    // }


    player.update(this.input.activePointer);
}