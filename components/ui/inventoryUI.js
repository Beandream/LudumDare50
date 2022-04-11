import { getItemsById } from "../inventory/items.js";

const y = 550;
// const x = 100;
const centerX = 400;
const xOffset = 75;

export function createInventoryUI(scene, inventory) {

    let hotbarSlots = [];

    let amount = (inventory.slotsAmount < 10) ? inventory.slotsAmount : 9;

    scene.add.rectangle(centerX, y, xOffset * amount, 75, 0x66625f).setStrokeStyle(4, 0xefc53f).setScrollFactor(0).setDepth(10);

    for (let i = 0; i < amount; i++) {
        let xPos = centerX - ((xOffset * (amount - 1)) / 2);

        let x = xPos + (xOffset * i)

        let btn = scene.buttons.create(x, y, 'inventory0', { texture: "woodenBox", scale: 0.5, onClick: () => { changeHandIndex(inventory, i) } });
        let textBG = scene.add.rectangle(x + 19, y - 21, 30, 25, 0xFFFFFF).setStrokeStyle(1, 0x000).setScrollFactor(0).setDepth(10);
        let text = scene.add.text(x + 5, y - 33, '0', { fontSize: '24px', fontStyle: 'bold', fill: '#000' }).setScrollFactor(0).setDepth(10);;

        hotbarSlots.push({ btn, text, textBG });
    }
    return { update, hotbarSlots };
}

function update(inventory, hotbarSlots) {
    hotbarSlots.forEach((slot, index) => {
        let itemId = inventory.slots[index]?.itemId;
        let texture = "white";
        let amount = 0;
        let scale = 1;
        if (itemId > -1) {
            let item = getItemsById(itemId, inventory.scene);
            texture = item.texture;
            scale = (item.scale / 1.5);
            amount = inventory.slots[index]?.quantity;
        }

        if (inventory.handIndex === index) {
            scale += 0.25
        }

        slot.btn.setTexture(texture)
        slot.btn.setScale(scale);
        if (amount > 0) {
            slot.text.setVisible(true);
            slot.textBG.setVisible(true);
            if (amount < 10) {
                amount = "0" + amount;
            }
            slot.text.setText(amount)
        } else {
            slot.text.setVisible(false);
            slot.textBG.setVisible(false);
        }
    })
}

function changeHandIndex(inventory, index) {
    inventory.changeHandIndex(index);
}