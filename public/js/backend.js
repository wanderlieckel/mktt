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

    hoursAgo(hours) {
        return Date.now() - (hours * 60 * 60 * 1000);
    }

    getOrders(orders) {
        if (window.electronAPI?.orders.getOrders) {
            window.electronAPI.orders.getOrders();
            return;
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
            return await window.electronAPI.orders.createOrder(order);
        }

        const newOrder = {
            id: crypto.randomUUID(),
            server: order.server,
            itemName: order.itemName,
            quantity: [0, Number(order.quantity)],
            value: Number(order.value),
            profit: 0,
            status: "active",
            timestamp: Date.now()
        };

        orders.push(newOrder);

        console.log("[Mock Backend] orders.createOrder()", newOrder);

        return newOrder;
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

        const order = orders.find(order => order.id === id);

        if (!order) {
            return false;
        }

        order.quantity[0] += Number(quantity);
        order.timestamp = Date.now();

        if (order.quantity[0] >= order.quantity[1]) {
            order.quantity[0] = order.quantity[1];
            order.status = "completed";
        }

        console.log("[Mock Backend] orders.executeOrder()", id, quantity);

        return true;
    }


}


window.backend = new Backend()