import { app, BrowserWindow } from "electron";

import { createMainWindow } from "./src/windows/mainWindow.js";
import { registerWindowIPC } from "./src/ipc/mainWindow.js";

let mainWindow;

app.whenReady().then(() => {

    mainWindow = createMainWindow();
    mainWindow.webContents.reload();
    registerWindowIPC(mainWindow);


    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            mainWindow = createMainWindow();
            registerWindowIPC(mainWindow);

        }
    });

});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        app.quit();
});