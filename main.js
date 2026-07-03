import { app, BrowserWindow } from "electron";

import { createMainWindow } from "./src/windows/mainWindow.js";
import { registerWindowIPC } from "./src/ipc/mainWindow.js";
import orderHandler from "./src/handlers/orderHandler.js";
import settingsHandler from "./src/handlers/settingsHandler.js";

let mainWindow;
let orderHandlerinstance = new orderHandler();
await orderHandlerinstance.init(); // Initialize the orderHandler instance
let settingsHandlerinstance = new settingsHandler();

app.whenReady().then(() => {

    mainWindow = createMainWindow();
    mainWindow.webContents.reload();
    mainWindow.webContents.on("before-input-event", (event, input) => {
        if (input.key === "F12") {
            mainWindow.webContents.toggleDevTools();
        }
    });
    registerWindowIPC(mainWindow, orderHandlerinstance, settingsHandlerinstance);


    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            mainWindow = createMainWindow();
            registerWindowIPC(mainWindow, orderHandlerinstance, settingsHandlerinstance);

        }
    });

});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        app.quit();
});