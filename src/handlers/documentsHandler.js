import fs from "fs/promises";
import path from "path";

export default class DocumentHandler {
    constructor() {
        this.dataPath = path.join(process.cwd(), "data");
        this.ordersPath = path.join(this.dataPath, "orders");
        this.settingsPath = path.join(this.dataPath, "settings");

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

    async loadSettingFile(name, forceReload = false) {


        const filePath = path.join(this.settingsPath, `${name}.json`)

        try {
            const content = await fs.readFile(filePath, "utf-8");
            const data = JSON.parse(content);
            return data;
        }
        catch (error) {
            if (error.code === "ENOENT") {
                throw new Error(
                    `Arquivo de configuração não encontrado: ${name}.json`
                );
            }

            if (error instanceof SyntaxError) {
                throw new Error(
                    `O arquivo ${name}.json contém um JSON inválido`
                );
            }

            throw error;
        }
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

    async saveProfitHistory(archive) {

        const filePath = path.join(this.settingsPath, `profithistory.json`);

        await fs.writeFile(
            filePath,
            JSON.stringify(archive, null, 4),
            "utf-8"
        );
        return archive;
    }

    async saveServerData(archive) {

        const filePath = path.join(this.settingsPath, `serverdata.json`);

        await fs.writeFile(
            filePath,
            JSON.stringify(archive, null, 4),
            "utf-8"
        );
        return archive;
    }

}