export const WoodenBox = (scene) => {
    const obj = {
        texture: "woodenBox",
        type: "block",
        scale: 0.75,

        updateItem: (x, y, pointer) => {
            if (pointer) {
                scene.blocks.updateHighlight(obj);
            }
        },

        disable: () => {
            scene.blocks.disableHighlight(obj);
        },

        useItem: (x, y, pointer, invetory, slotIndex) => {
            scene.blocks.create(pointer.worldX, pointer.worldY, { texture: obj.texture, scale: obj.scale });
            invetory.dropItem(slotIndex, 1);
        }
    }
    return obj
}