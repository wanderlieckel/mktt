import { ipcMain, app } from "electron";

export function registerWindowIPC(window) {

    ipcMain.on("window-minimize", () => {
        window.minimize();
    });

    ipcMain.on("window-close", () => {
        app.quit();
    });

}