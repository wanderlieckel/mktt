import documentsHandler from "./documentsHandler.js";
import historyHandler from "./historyHandler.js";

export default class settingsHandler {
    constructor() {
        this.documentsHandlerInstance = new documentsHandler();
        this.historyHandlerInstance = new historyHandler();
        this.profitsummary = [];
    }

    async getServerList() {
        return await this.documentsHandlerInstance.loadSettingFile('servers')
    }

    async getprofitSummary() {
        let profit = await this.documentsHandlerInstance.loadSettingFile('profithistory')
        let servers = await this.documentsHandlerInstance.loadSettingFile('servers')
        let profitsummary = {
            total: {},
            monthly: {},
            daily: {},
        }

        for (let i = 0; i < servers.length; i++) {
            const serv = servers[i];
            profitsummary.total[serv.toLowerCase()] = 0;
            profitsummary.monthly[serv.toLowerCase()] = 0;
            profitsummary.daily[serv.toLowerCase()] = 0;

            for (let ind = 0; ind < profit.length; ind++) {
                const prof = profit[ind];
                const date = new Date(prof.timestamp);
                const tdy = Date.now()
                const today = new Date(tdy)

                //Somar no total:
                if (prof.server === serv.toLowerCase()) {
                    profitsummary.total[serv.toLowerCase()] = profitsummary.total[serv.toLowerCase()] + prof.profit


                    //checar ano 
                    if (date.getFullYear() === today.getFullYear()) {
                        if ((date.getMonth() + 1) === (today.getMonth() + 1)) {
                            profitsummary.monthly[serv.toLowerCase()] = profitsummary.monthly[serv.toLowerCase()] + prof.profit

                            if (date.getDate() === today.getDate()) {
                                profitsummary.daily[serv.toLowerCase()] = profitsummary.daily[serv.toLowerCase()] + prof.profit
                            }
                        }

                    }
                }




            }

        }

        return profitsummary

    }

    async getServerCoinConfig(server) {

        let data = await this.documentsHandlerInstance.loadSettingFile('serverdata')
        let s = server.toLowerCase()
        return data[s.toLowerCase()]

    }

    async getItensSchema() {
        let itens = await this.documentsHandlerInstance.loadSettingFile('itensSchema')
        return itens
    }

    async getItensSchemaNames() {
        let itens = await this.documentsHandlerInstance.loadSettingFile('itensSchema')
        let response = { itemlist: [], itemobjetcts: [] }
        for (let i = 0; i < itens.length; i++) {
            const e = itens[i];
            response.itemlist.push(e.name)
            response.itemobjetcts.push(e)
        }
        return response
    }

    async updateGoldCoinValue(server, value) {
        let data = await this.documentsHandlerInstance.loadSettingFile('serverdata')
        data[server.toLowerCase()][0] = value
        await this.documentsHandlerInstance.saveServerData(data)
    }
    async updateBRL250CoinsValue(server, value) {
        let data = await this.documentsHandlerInstance.loadSettingFile('serverdata')
        data[server.toLowerCase()][1] = value
        await this.documentsHandlerInstance.saveServerData(data)
    }
}
