import Coin from "./Coin.js"
export default class World {

    constructor(name) {
        this.name = name;
        this.coin = new Coin();
    }

    setCoinValue = (price) => {
        this.coinValue = price
    }
    getCoinValue = () => {
        return this.coinValue
    }
    calcValue = (value) => {

        return value / this.coinValue
    }

    monetaryValue = (value) => {
        let coins = value / this.coinValue
        return coins * this.coin.price();

    }
}