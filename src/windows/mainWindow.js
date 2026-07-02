import { BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createMainWindow() {

    const window = new BrowserWindow({
        width: 865,
        height: 1080,

        minWidth: 865,
        maxWidth: 865,

        frame: false,
        resizable: false,
        autoHideMenuBar: true,
        backgroundColor: "#061326",

        webPreferences: {
            preload: path.join(__dirname, "../../preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    window.loadFile(path.join(__dirname, "../../public/index.html"));
    

    return window;
}