var level = [
]

function createFloor() {
    let yPos = 600; // 75 * 8
    let xPos = -300;

    for (let i = 0; i < 16; i++) {
        let x = (xPos + (75 * i));
        let y = yPos;
        level.push({
            x,
            y,
            itemId: 0
        });
    }
}

function createRandom() {
    let minX = -300;
    let maxX = 900;

    let minY = 525;
    let maxY = -3000;

    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < 64; i++) {
        let x = (randomNumber(minX, maxX));
        let y = randomNumber(minY, maxY);

        x = (Math.floor(x / 75) * 75)
        y = (Math.floor(y / 75) * 75)

        level.push({
            x,
            y,
            itemId: 0
        });
    }
}

export function getLevel1() {
    createFloor();
    createRandom();
    return level
}