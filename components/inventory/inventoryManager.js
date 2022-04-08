export const InventoryManager = {
    collectItem: (inventory, item) => {
        let inventoryType = getInventoryType(inventory, item);
        inventoryType.push(item);
    },
    craftItem: (inventory, item) => {
        //check to see if player has enough materials to craft
        //remove needed materials
        //add crafted item
    },
    useItem: (inventory, playerX, playerY, pointer) => {
        //one time uses need to remove self
        //such as blocks
        if (!inventory.hand) return
        inventory.hand.use(playerX, playerY, pointer, inventory);

        let inventoryType = getInventoryType(inventory, inventory.hand)
        inventoryType.splice(inventoryType.indexOf(inventory.hand), 1);
        inventory.hand.disableHighlight();
        inventory.hand = null;
    },
    dropItem: (inventory, item) => {
        //remove from inventory and place item entity in world
    },
    switchHandItem: (inventory, item, index) => {
        if (inventory.hand) inventory.hand.disable(); //remove old hand item first
        //put item in hand
        if (!item) {
            inventory.hand = null;
        } else {
            inventory.hand = item;
            inventory.hand.init(400, 550, 400, 300)
        }
    },
    update: (inventory, playerX, playerY, pointer) => {
        if (!inventory.hand) return
        inventory.hand.update(playerX, playerY, pointer);
    }
}

function getInventoryType(inventory, item) {
    if (item.type === "block") return inventory.blocks;
    if (item.type === "tool") return inventory.tools;
    if (item.type === "material") return inventory.materials;
}

function removeFromInventory() {

}