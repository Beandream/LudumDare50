import { getItemsById } from "../inventory/items.js";

const y = 550;
// const x = 100;
const centerX = 400;
const xOffset = 75;

export function createInventoryUI(scene, inventory) {

    let buttons = [];

    let amount = (inventory.slotsAmount < 10) ? inventory.slotsAmount : 9;

    var r1 = scene.add.rectangle(centerX, y, xOffset * amount, 75, 0x66625f).setScrollFactor(0);
    r1.setStrokeStyle(4, 0xefc53f);

    for (let i = 0; i < amount; i++) {
        let x = centerX - ((xOffset * (amount - 1)) / 2);

        let btn = scene.buttons.create(x + (xOffset * i), y, 'inventory0', { texture: "woodenBox", scale: 0.5, onClick: () => { changeHandIndex(inventory, i)} });
        buttons.push(btn);
    }
    console.log(buttons);
    return {update, buttons};
}

function update(inventory, buttons) {
    buttons.forEach((btn, index) => {
        let itemId = inventory.slots[index]?.itemId;
        let texture = "white";
        let scale = 1;
        if (itemId > -1) {
            let item = getItemsById(itemId, inventory.scene);
            texture = item.texture;
            scale = (item.scale / 1.5);
        }

        if (inventory.handIndex === index) {
            scale += 0.25
        }

        btn.setTexture(texture)
        btn.setScale(scale);
    })
}

function changeHandIndex(inventory, index) {
    inventory.changeHandIndex(index);
}