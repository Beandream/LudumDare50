export function Preload() {
    let demoSrc = "https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/"

    this.load.image('sky', demoSrc + 'src/games/firstgame/assets/sky.png');
    this.load.image('ground', demoSrc + 'src/games/firstgame/assets/platform.png');
    this.load.image('star', demoSrc + 'src/games/firstgame/assets/star.png');
    this.load.image('bomb', demoSrc + 'src/games/firstgame/assets/bomb.png');
    this.load.spritesheet('dude',
        demoSrc + 'src/games/firstgame/assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );

    this.load.image('platformWide', './assets/PlatformTestWide.png');
    this.load.image('platformTall', './assets/PlatformTestTall.png');
    this.load.image('platformSquare', './assets/PlatformTestSquare.png');


}