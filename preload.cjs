const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    minimizeWindow: () => ipcRenderer.send("window-minimize"),
    closeWindow: () => ipcRenderer.send("window-close"),
    orders: {
        getOrders: () => ipcRenderer.invoke("orders:getOrders"),
        createOrder: (order) => ipcRenderer.invoke("orders:createOrder", order),
        executeOrder: (orderId, quantity) => ipcRenderer.invoke("orders:executeOrder", orderId, quantity),
        cancelOrder: (orderId) => ipcRenderer.invoke("orders:cancelOrder", orderId),

    },
    settings: {
        getServerList: () => ipcRenderer.invoke("settings:getServerList"),
        getProfitSummary: () => ipcRenderer.invoke("settings:getProfitSummary"),
        getServerCoinConfig: (server) => ipcRenderer.invoke("settings:getServerCoinConfig", server),
        updateGoldCoinValue: (server, value) => ipcRenderer.invoke("settings:updateGoldCoinValue", server, value),
        updateBRL250CoinsValue: (server, value) => ipcRenderer.invoke("settings:updateBRL250CoinsValue", server, value),
        getItensSchemaNames: () => ipcRenderer.invoke("settings:getItensSchemaNames")
    }
});