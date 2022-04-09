export class Inventory {
    constructor(scene, id, slotsAmount) {
        this.scene = scene;
        this.id = id;

        this.slotsAmount = slotsAmount;
        this.slots = setupSlots(slotsAmount);

        this.addItem = (id, quantity) => {
            let amount = quantity;
            addToAvailableSpace(this.slots, id);
            addToAvailableSpace(this.slots, -1);

            function addToAvailableSpace(slots, idMatch) {
                slots.forEach(slot => {
                    if (amount < 1) return;
                    if (slot.id != idMatch) return

                    let availableSpace = (64 - slot.quantity); //hardcoded 64
                    if (availableSpace < 1) return

                    if (availableSpace > amount) {
                        //add amount
                        slot.quantity += amount;
                        slot.id = id;
                        amount = 0;
                    } else {
                        //add available space
                        slot.quantity += availableSpace;
                        slot.id = id;
                        amount -= availableSpace;
                    }
                })
            }
            return amount;
        }

        this.dropItem = (index, quantity) => {
            if (quantity < 1) return false
            let id = this.slots[index].id;
            let availableAmount = this.slots[index].quantity;

            let amount = (availableAmount < quantity) ? availableAmount : quantity;

            this.slots[index].quantity -= amount;
            if (this.slots[index].quantity < 1) {
                this.slots[index] = {
                    id: -1,
                    quantity: -1,
                }
            }
            console.log("returned: " + id, amount);
            return { id, quantity: amount }
        }
    }
}

function setupSlots(slotsAmount) {
    let slots = [];
    for (let i = 0; i < slotsAmount; i++) {
        slots[i] = {
            id: -1,
            quantity: -1,
        }
    }
    return slots;
}