export default class orderHandler {
    constructor() {

    }

    async getOrders() {
        console.log("Fetching orders...");
        return [
            {
                id: "2",
                server: "auroria",
                itemName: "Gold Ingot",
                quantity: [2, 15],
                value: 12000,
                profit: 0.03,
                status: "active",
                timestamp: 1321321321
            }
        ];
    }
}