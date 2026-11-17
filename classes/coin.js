class Coin {
    constructor(xPosition, background) {
        this.coin = document.createElement("div");
        this.coinHeight = 50;
        this.coinWidth = 50;
        this.velocity = 15;
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
        console.log(" In Coins construnctor");
    }

    startMovingCoin() {
        setInterval(() => {
            this.yPosition += 5 + this.velocity;
            this.coin.style.top = this.yPosition + "px";
        }, 40);
    }
}