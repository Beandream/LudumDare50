export const Square = (scene) => {
    const obj = {
        texture: "platformSquare",
        type: "block",
        scale: 1,
        maxStackSize: 10,
        itemId: 1,

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