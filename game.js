const config = {
    type: Phaser.AUTO,
    parent: "gameDiv",
    scale: {
        // mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 0 },
        },
    },
    backgroundColor: "#4488aa",
    scene: [
        {
            preload: preload,
            create: create,
            update: update,
        }
    ],
}

const game = new Phaser.Game(config);

function preload() {
}

function create() {
}

function update() {
}