export class Inventory {
    constructor(scene, id, slotsAmount) {
        this.scene = scene;
        this.id = id;

        this.slotsAmount = slotsAmount;
        this.slots = setupSlots(slotsAmount);

        this.addItem = (id, quantiy) => {
            let emptyIndex = this.slots.findIndex(slot => slot.id === -1);
            if (emptyIndex === -1 || quantiy < 1) return false // no empty slots, can't add item

            this.slots[emptyIndex] = {
                id,
                quantiy
            }

            console.log(this.slots);
        }

        this.dropItem = (index, quantiy) => {
            if (quantiy < 1) return false 
            this.slot[index].quantiy -= quantiy;

            if (this.slots[index].quantiy < 1) {
                this.slots[index] = {
                    id: -1,
                    quantiy: -1,
                }
            }

        }
    }
}

function setupSlots(slotsAmount) {
    let slots = [];
    for (let i = 0; i < slotsAmount; i++) {
        slots[i] = {
            id: -1,
            quantiy: -1,
        }
    }
    return slots;
}