import crypto from "crypto";
import documentsHandler from "./documentsHandler.js";

export default class orderHandler {
    constructor() {
        this.orders = [
        ];
        this.getTaxValue = this.getTaxValue.bind(this);
        this.documentsHandlerInstance;



    }

    async init() {
        this.documentsHandlerInstance = new documentsHandler();
        await this.documentsHandlerInstance.init();
        this.orders = await this.documentsHandlerInstance.loadOrders();
    }

    getTaxValue(itemName) {
        //todo implement logic to get tax value based on itemName
        return 0;
    }


    getOrders() {

        return this.orders
    }


    async createOrder(order) {
        let newOrder = {
            id: crypto.randomUUID(),
            server: order.server,
            itemName: order.itemName,
            quantity: [0, Number(order.quantity)],
            value: Number(order.value),
            profit: this.getTaxValue(order.itemName),
            status: "active",
            creationtime: Date.now(),
            lastupdate: Date.now()
        }
        this.documentsHandlerInstance.saveOrder(newOrder);
        this.orders.push(newOrder);

    }


    async executeOrder(orderId, quantity) {
        let orderdisp = []

        const order = this.orders.find(order => order.id === orderId);

        if (!order) {
            throw new Error("Order not found");
        }

        for (let i = 0; i < this.orders.length; i++) {
            const o = this.orders[i];

            if (o.server === order.server && o.itemName === order.itemName && o.status === "active") {
                orderdisp.push(o);
            }

        }
        orderdisp.sort((a, b) => a.creationtime - b.creationtime);
        let quantityremaining = Number(quantity);
        orderdisp.forEach(async (o) => {
            let delta = o.quantity[1] - o.quantity[0];
            if (delta > 0 && quantityremaining > 0) {
                let executedQuantity = Math.min(delta, quantityremaining);
                o.quantity[0] += executedQuantity;

                if (o.quantity[0] === o.quantity[1]) {
                    o.status = "completed";
                }
                o.lastupdate = Date.now();
                //todo :implement profit function logic here
                quantityremaining -= executedQuantity;
                this.documentsHandlerInstance.saveOrder(o);
            }

        })
    }
}