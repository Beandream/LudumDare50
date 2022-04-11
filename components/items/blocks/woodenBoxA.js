export const WoodenBoxA = (scene) => {
    const obj = {
        texture: "woodenBoxA",
        type: "block",
        scale: 1.2,
        maxStackSize: 10,
        itemId: 2,

        updateItem: (x, y, pointer) => {
            if (pointer) {
                scene.blocks.updateHighlight(obj);
            }
        },

        disable: () => {
            scene.blocks.disableHighlight(obj);
        },

        useItem: (x, y, pointer, inventory, slotIndex) => {
            scene.blocks.create(pointer.worldX, pointer.worldY, { inventory, self: obj});
            inventory.dropItem(slotIndex, 1);
        }
    }
    return obj
}