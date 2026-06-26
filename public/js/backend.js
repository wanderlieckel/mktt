class Backend {
    constructor() {
        this.window = new WindowBackend();
        this.statistics = new StatisticsProfit();
        this.servers = new Servers();
        this.orders = [];
        this.orderHandler = new OrderHandler();
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
        if (window.electronAPI?.statistics.getSummary) {
            window.electronAPI.statistics.getSummary();
            return;
        }
        else {
            console.log("[Mock Backend] statistics.getSummary()");

            return {
                total: 122.00,
                monthly: 35.00,
                daily: 4.50
            };
        }
    }
}

class Servers {
    getServerList() {
        if (window.electronAPI?.statistics.getServerList) {
            window.electronAPI.statistics.getServerList();
            return;
        }
        else {
            console.log("[Mock Backend] statistics.getServerList()");
            return ["Auroria", "Belaria", "Bellum", "Divinian", "Etherian", "Elysian",
                "Halorian", "Lunarian", "Serenian", "Solarian", "Mistian", "Vesperia",
                "Spectrum", "Tenebrium", "Grimoria I", "Grimoria II", "Grimoria III", "Grimoria IV"
            ];

        }
    }
}

class OrderHandler {
    getOrders() {
        if (window.electronAPI?.orders.getOrders) {
            window.electronAPI.orders.getOrders();
            return;
        }
        else {
            console.log("[Mock Backend] orders.getOrders()");
            return [
                { id: "1", server: 'auroria', itemName: 'Iron Ore', quantity: [0, 10], value: 500, status: 'active' },
                { id: "2", server: 'auroria', itemName: 'Demonic Essence', quantity: [0, 5], value: 1000, status: 'active' },
                { id: "3", server: 'bellum', itemName: 'Iron Ore', quantity: [10, 10], value: 500, status: 'done' },
                { id: "4", server: 'belaria', itemName: 'Demonic Essence', quantity: [3, 5], value: 1000, status: 'cancelled' },
            ];
        }

    }
}


window.backend = new Backend()