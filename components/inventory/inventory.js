import { Item } from "./item.js";
import { getItemsById } from "./items.js";
import { createInventoryUI } from "../ui/inventoryUI.js";


export class Inventory {
    constructor(scene, id, slotsAmount) {
        this.scene = scene;
        this.id = id;

        this.slotsAmount = slotsAmount;
        this.slots = setupSlots(slotsAmount);

        this.handIndex = slotsAmount - 1;

        this.hotbar = createInventoryUI(this.scene, this);

        this.changeHandIndex = (index) => {
            if (index === this.handIndex) {
                disableHand(this);
                this.handIndex = -1;
            } else {
                disableHand(this);
                this.handIndex = index;
            }
        }

        this.useItem = (x, y, pointer) => {
            let slot = this.slots[this.handIndex]
            if (slot?.itemId > -1) {
                let item = getItemsById(slot.itemId, this.scene);
                item.useItem(x, y, pointer, this, this.handIndex);
            }
        }

        this.updateItem = (x, y, pointer) => {

            this.hotbar.update(this, this.hotbar.hotbarSlots);


            let slot = this.slots[this.handIndex]
            if (slot?.itemId > -1) {
                let item = getItemsById(slot.itemId, this.scene);
                item.updateItem(x, y, pointer, this, this.handIndex);
            }
        }

        this.addItem = (itemId, quantity, data) => {
            let amount = quantity;
            addToAvailableSpace(this.slots, itemId);
            addToAvailableSpace(this.slots, -1);

            function addToAvailableSpace(slots, idMatch) {
                slots.forEach(slot => {
                    if (amount < 1) return;
                    if (slot.itemId != idMatch) return

                    let availableSpace = (64 - slot.quantity); //hardcoded 64, instead get amount from the id's max amount
                    if (availableSpace < 1) return

                    if (availableSpace > amount) {
                        //add amount
                        slot.quantity += amount;
                        slot.itemId = itemId;
                        slot.data = data;
                        amount = 0;
                    } else {
                        //add available space
                        slot.quantity += availableSpace;
                        slot.itemId = itemId;
                        slot.data = data;
                        amount -= availableSpace;
                    }
                })
            }
            return amount; // the amount that didn't fit in inventory
        }

        this.dropItem = (index, quantity) => {
            if (quantity < 1) return false
            let itemId = this.slots[index].itemId;
            let availableAmount = this.slots[index].quantity;
            let data = this.slots[index].data;

            let amount = (availableAmount < quantity) ? availableAmount : quantity;

            this.slots[index].quantity -= amount;
            if (this.slots[index].quantity < 1) {
                disableHand(this);

                this.slots[index] = new Item(-1, -1);
            }
            return { itemId, quantity: amount, data } // the amount and type of item dropped
        }
    }
}

function disableHand(inventory) {
    let slot = inventory.slots[inventory.handIndex];

    if (slot?.itemId > -1) {
        let item = getItemsById(slot.itemId, inventory.scene);
        item.disable();
    }
}

function setupSlots(slotsAmount) {
    let slots = [];
    for (let i = 0; i < slotsAmount; i++) {
        slots[i] = new Item(-1, -1);
    }
    return slots;
}