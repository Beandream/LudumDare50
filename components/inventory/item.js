export class Item {
    constructor(itemId, quantity, data = {}) {
        this.itemId = itemId;
        this.quantity = quantity;
        this.data = data;
    }
}