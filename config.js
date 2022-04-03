export function Setup(preload, create, update) {
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
                gravity: { y: 1600 },
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

    return game;
}