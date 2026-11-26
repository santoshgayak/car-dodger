class Coin {

    hascollided = false;
    value = 500;
    coinSpeed = {
        "1": 50,
        "2": 48,
        "3": 46,
        "4": 44,
        "5": 40,
        "6": 38,
        "7": 34,
        "8": 30,
        "9": 25,
        "10":10
    }

    constructor(xPosition, background) {
        this.coin = document.createElement("div");
        this.coinHeight = 50;
        this.coinWidth = 50;
        this.velocity = 25;
        this.xPosition = xPosition;
        this.yPosition = -400;

        this.coin.style.height = this.coinHeight + "px";
        this.coin.style.width = this.coinWidth + "px";
        this.coin.style.position = "absolute";
        this.coin.style.top = this.yPosition + "px";
        this.coin.style.left = this.xPosition + "%";
        this.coin.style.backgroundImage = `url("${background}")`;
        this.coin.style.backgroundSize = "contain";
        this.coin.style.backgroundRepeat = "no-repeat";
        this.coin.style.backgroundPosition = "center";
        this.coin.classList.add("coin");
    }

    startMovingCoin(level) {
        setInterval(() => {
            this.yPosition += 5 + this.velocity;
            this.coin.style.top = this.yPosition + "px";
        }, this.coinSpeed[level]);
    }
}