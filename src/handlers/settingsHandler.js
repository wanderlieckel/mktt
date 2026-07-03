export default class settingsHandler {
    constructor() {

    }

    async getServerList() {
        console.log("Fetching server list...");
        return [
            "Auroria",
            "Belaria",
            "Bellum",
            "Divinian",
            "Etherian",
            "Elysian",
            "Halorian",
            "Lunarian",
            "Serenian",
            "Solarian",
            "Mistian",
            "Vesperia",
            "Spectrum",
            "Tenebrium",
            "Grimoria I",
            "Grimoria II",
            "Grimoria III",
            "Grimoria IV"
        ];
    }

    async getprofitSummary() {
        console.log("Fetching profit summary...");
        return {
            total: 'R$ 122.00',
            monthly: 'R$ 35.00',
            daily: 'R$ 0.00'
        };
    }
}
