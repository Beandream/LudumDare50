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

        this.switchHandItem = (item) => {
            InventoryManager.switchHandItem(this, item);
        }
        this.collectItem = (item) => {
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