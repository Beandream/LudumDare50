import { InventoryManager } from "./inventoryManager.js";

export class Inventory {
    constructor(scene, id) {
        this.materials = [];
        this.tools = [];
        this.blocks = [];

        this.manager = InventoryManager;
        this.scene = scene;
        this.id = id;

        this.hand = null

        this.switchHandItem = (index) => {
            if (index < 0) {
                InventoryManager.switchHandItem(this, null, null);
            } else {
                InventoryManager.switchHandItem(this, this.blocks[index], index);
            }
        }
        this.collectItem = (item) => {
            console.log(this);
            InventoryManager.collectItem(this, item);
        }
        this.craftItem = (item) => {
            InventoryManager.craftItem(this, item);
        }
        this.useItem = (playerX, playerY, pointer) => {
            InventoryManager.useItem(this, playerX, playerY, pointer);
        }
        this.dropItem = (item) => {
            InventoryManager.dropItem(this, item);
        }
        this.update = (playerX, playerY, pointer) => {
            InventoryManager.update(this, playerX, playerY, pointer);
        }
    }
}