import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
	width: 960,
	height: 1080,
	resizable: false,
    frame:false,
	x: 0,
	y: 0,
	webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
	
  });
  win.setMenu(null);
  win.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});