import documentsHandler from "./documentsHandler.js";

export default class historyHandler {
    constructor() {
        this.documentsHandlerInstance;
        this.documentsHandlerInstance = new documentsHandler();
        
    }

    async loadNewHistory() {
        return await this.documentsHandlerInstance.loadSettingFile('profithistory')
    }


}
