import fs from "fs/promises";
import path from "path";

export default class DocumentHandler {
    constructor() {
        this.dataPath = path.join(process.cwd(), "data");
        this.ordersPath = path.join(this.dataPath, "orders");

        this.orders = new Map();
    }

    async init() {
        await this.ensureFolders();
        await this.loadOrders();
    }

    async ensureFolders() {
        await fs.mkdir(this.ordersPath, { recursive: true });
    }



    async loadOrders() {
        const files = await fs.readdir(this.ordersPath);
        let loadedOrders = [];

        for (const file of files) {
            if (!file.endsWith(".json")) continue;

            const filePath = path.join(this.ordersPath, file);
            const content = await fs.readFile(filePath, "utf-8");
            const order = JSON.parse(content);
            loadedOrders.push(order);
            
        }
        return loadedOrders;
    }


    async saveOrder(order) {
        if (!order.id) {
            throw new Error("Order must have an id");
        }

        const filePath = path.join(this.ordersPath, `${order.id}.json`);

        await fs.writeFile(
            filePath,
            JSON.stringify(order, null, 4),
            "utf-8"
        );
        return order;
    }
}