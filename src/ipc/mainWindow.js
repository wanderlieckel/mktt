import { ipcMain, app } from "electron";

export function registerWindowIPC(window, orderHandler, settingsHandler) {

    ipcMain.on("window-minimize", () => {
        window.minimize();
    });

    ipcMain.on("window-close", () => {
        app.quit();
    });


    // Orders
    ipcMain.handle("orders:getOrders", () => {
        return orderHandler.getOrders();
    });
    ipcMain.handle("orders:createOrder", (_event, order) => {
        return orderHandler.createOrder(order);
    });
    ipcMain.handle("orders:executeOrder", (_event, orderId, quantity) => {
        return orderHandler.executeOrder(orderId, quantity);
    });
    ipcMain.handle("orders:cancelOrder", (_event, orderId) => {
        return orderHandler.cancelOrder(orderId);
    });


    //settings
    ipcMain.handle("settings:getServerList", () => {
        return settingsHandler.getServerList();
    });

    ipcMain.handle("settings:getProfitSummary", () => {
        return settingsHandler.getprofitSummary();
    });
    ipcMain.handle("settings:getServerCoinConfig", (_event, server) => {
        return settingsHandler.getServerCoinConfig(server);
    });
    ipcMain.handle("settings:updateGoldCoinValue", (_event, server, value) => {
        return settingsHandler.updateGoldCoinValue(server, value);
    });
    ipcMain.handle("settings:updateBRL250CoinsValue", (_event, server, value) => {
        return settingsHandler.updateBRL250CoinsValue(server, value);
    });
    ipcMain.handle("settings:getItensSchemaNames", () => {
        return settingsHandler.getItensSchemaNames();
    });
} 