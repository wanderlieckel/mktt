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



    //settings
    ipcMain.handle("settings:getServerList", () => {
        return settingsHandler.getServerList();
    });

    ipcMain.handle("settings:getProfitSummary", () => {
        return settingsHandler.getprofitSummary();
    });
}