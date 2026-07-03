const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    minimizeWindow: () => ipcRenderer.send("window-minimize"),
    closeWindow: () => ipcRenderer.send("window-close"),
    orders: {
        getOrders: () => ipcRenderer.invoke("orders:getOrders"),
        createOrder: (order) => ipcRenderer.invoke("orders:createOrder", order),
        executeOrder: (orderId, quantity) => ipcRenderer.invoke("orders:executeOrder", orderId, quantity)
    },
    settings: {
        getServerList: () => ipcRenderer.invoke("settings:getServerList"),
        getProfitSummary: () => ipcRenderer.invoke("settings:getProfitSummary")
    }
});