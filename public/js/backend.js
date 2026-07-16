class Backend {
    constructor() {
        this.window = new WindowBackend();
        this.statistics = new StatisticsProfit();
        this.servers = new Servers();
        this.orders = [];
        this.orderHandler = new OrderHandler();
        this.settings = new SettingsBackend();
    }
}

class WindowBackend {
    minimize() {
        if (window.electronAPI?.minimizeWindow) {
            window.electronAPI.minimizeWindow();
            return;
        }

        console.log("[Mock Backend] window.minimize()");
    }

    close() {
        if (window.electronAPI?.closeWindow) {
            window.electronAPI.closeWindow();
            return;
        }

        console.log("[Mock Backend] window.close()");
    }
}
class StatisticsProfit {

    getTotalProfit() {
        if (window.electronAPI?.settings.getProfitSummary) {
            return window.electronAPI.settings.getProfitSummary();

        }
        else {
            console.log("[Mock Backend] settings.getProfitSummary())");

            return {
                total: 'R$ 122.00',
                monthly: 'R$ 35.00',
                daily: 'R$ 0.00'
            };
        }
    }
}

class Servers {
    getServerList() {
        if (window.electronAPI?.settings.getServerList) {
            return window.electronAPI.settings.getServerList();

        }
        else {
            console.log("[Mock Backend] settings.getServerList()");
            return ["Auroria", "Belaria", "Bellum", "Divinian", "Etherian", "Elysian",
                "Halorian", "Lunarian", "Serenian", "Solarian", "Mistian", "Vesperia",
                "Spectrum", "Tenebrium", "Grimoria I", "Grimoria II", "Grimoria III", "Grimoria IV"
            ];

        }
    }
}

class OrderHandler {

    hoursAgo(hours) {
        return Date.now() - (hours * 60 * 60 * 1000);
    }

    async getOrders(orders) {
        if (window.electronAPI?.orders.getOrders) {
            return await window.electronAPI.orders.getOrders();

        }
        else {
            console.log("[Mock Backend] orders.getOrders()");
            if (orders.length > 0) {
                return orders;
            } else {
                return [
                    {
                        id: "2",
                        server: "auroria",
                        itemName: "Gold Ingot",
                        quantity: [2, 15],
                        value: 12000,
                        profit: 0.03,
                        status: "active",
                        timestamp: this.hoursAgo(37)
                    },
                    {
                        id: "3",
                        server: "auroria",
                        itemName: "Platinum Coin",
                        quantity: [0, 100],
                        value: 1150,
                        profit: 0.05,
                        status: "active",
                        timestamp: this.hoursAgo(49)
                    }
                ];
            }

        }

    }
    async createOrder(order, orders) {
        if (window.electronAPI?.orders?.createOrder) {
            console.log("[Mock Backend] orders.createOrder()", order);
            return await window.electronAPI.orders.createOrder(order);
        }

    }

    async cancelOrder(id, orders) {
        if (window.electronAPI?.orders?.cancelOrder) {
            return await window.electronAPI.orders.cancelOrder(id);
        }

        const order = orders.find(order => order.id === id);

        if (!order) {
            return false;
        }

        order.status = "cancelled";

        console.log("[Mock Backend] orders.cancelOrder()", id);

        return true;
    }

    async executeOrder(id, quantity, orders) {
        if (window.electronAPI?.orders?.executeOrder) {
            return await window.electronAPI.orders.executeOrder(id, quantity);
        }


        return true;
    }


}

class SettingsBackend {

    constructor() {

        this.serverSettings = {

            auroria: {
                goldCoinValue: 45000,
                brl250CoinsValue: 86.00
            },

            belaria: {
                goldCoinValue: 42000,
                brl250CoinsValue: 86.00
            }

        };

    }

    async getServerSettings(server) {
        server = server.toLowerCase()
        if (window.electronAPI?.settings?.getServerCoinConfig) {

            return await window.electronAPI.settings.getServerCoinConfig(server);
        }

        console.log("[Mock Backend] settings.getServerCoinConfig()", server);

        return this.serverSettings[server];

    }

    async getItemList() {

        if (window.electronAPI?.settings?.getItensSchemaNames) {

            return await window.electronAPI.settings.getItensSchemaNames();
        }


    }




    async updateGoldCoinValue(server, value) {

        if (window.electronAPI?.settings?.updateGoldCoinValue) {
            return await window.electronAPI.settings.updateGoldCoinValue(server, value);
        }

        console.log("[Mock Backend] settings.updateGoldCoinValue()", server, value);

        if (!this.serverSettings[server]) {
            this.serverSettings[server] = {};
        }

        this.serverSettings[server].goldCoinValue = value;

        return true;

    }

    async updateBRL250CoinsValue(server, value) {

        if (window.electronAPI?.settings?.updateBRL250CoinsValue) {
            return await window.electronAPI.settings.updateBRL250CoinsValue(server, value);
        }

        console.log("[Mock Backend] settings.updateBRL250CoinsValue()", server, value);

        if (!this.serverSettings[server]) {
            this.serverSettings[server] = {};
        }

        this.serverSettings[server].brl250CoinsValue = value;

        return true;

    }

}



window.backend = new Backend()