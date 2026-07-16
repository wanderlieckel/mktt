import crypto from "crypto";
import documentsHandler from "./documentsHandler.js";
import historyHandler from "./historyHandler.js";
import settingsHandler from "./settingsHandler.js";

export default class orderHandler {
    constructor() {
        this.orders = [
        ];
        this.getTaxValue = this.getTaxValue.bind(this);
        this.documentsHandlerInstance;
        this.historyHandlerInstance = new historyHandler();
        this.settingsHandlerInstance = new settingsHandler();
        this.itensschema;

    }

    async init() {
        this.documentsHandlerInstance = new documentsHandler();
        await this.documentsHandlerInstance.init();
        this.orders = await this.documentsHandlerInstance.loadOrders();
        this.itensschema = await this.settingsHandlerInstance.getItensSchema();

    }



    getTaxValue(itemvalue, quantity) {
        let fullvalue = itemvalue * quantity * 0.02
        if (fullvalue < 20) {
            return 20
        } else {
            return fullvalue
        }
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
            profit: (this.getTaxValue(order.value, order.quantity)) * -1,
            status: "active",
            creationtime: Date.now(),
            lastupdate: Date.now()
        }
        this.documentsHandlerInstance.saveOrder(newOrder);
        this.orders.push(newOrder);

        let profit = await this.historyHandlerInstance.loadNewHistory();

        profit.push({
            timestamp: newOrder.creationtime,
            type: "ordercreation",
            server: newOrder.server,
            profit: newOrder.profit
        })

        this.documentsHandlerInstance.saveProfitHistory(profit)

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
                const itemvalue = this.itensschema.find(itemvalue => itemvalue.name === o.itemName).value
                const profit = (itemvalue - o.value) * executedQuantity
                console.log(profit)


                if (o.quantity[0] === o.quantity[1]) {
                    o.status = "completed";
                }
                o.lastupdate = Date.now();
                o.profit = o.profit + profit

                quantityremaining -= executedQuantity;
                this.documentsHandlerInstance.saveOrder(o);
                const historyline = {
                    "timestamp": o.lastupdate,
                    "type": "orderexecution",
                    "server": o.server,
                    "profit": profit
                }
                let historydocument = await this.historyHandlerInstance.loadNewHistory();

                historydocument.push(historyline)
                this.documentsHandlerInstance.saveProfitHistory(historydocument)
            }

        })
    }

    async cancelOrder(orderId) {
        const order = this.orders.find(order => order.id === orderId);

        if (!order) {
            throw new Error("Order not found");
        }
        order.status = "cancelled"

        this.documentsHandlerInstance.saveOrder(order);
    }
}