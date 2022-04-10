export const WoodenBox = (scene) => {
    const obj = {
        texture: "woodenBox",
        type: "block",
        scale: 0.75,
        maxStackSize: 10,
        itemId: 0,

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