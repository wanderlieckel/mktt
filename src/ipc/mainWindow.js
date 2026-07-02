import { ipcMain, app } from "electron";

export function registerWindowIPC(window, orderHandler) {

    ipcMain.on("window-minimize", () => {
        window.minimize();
    });

    ipcMain.on("window-close", () => {
        app.quit();
    });

    ipcMain.handle("orders:getOrders", () => {

        return orderHandler.getOrders();

    });
}