class Divider{


    dividerSpeed = 200;
    constructor(yPosition, xPostion){
        this.divider = document.createElement("div");
        this.dividerHeight = 100;
        this.dividerWidth = 5;
        this.velocity = 300;
        this.yPosition = yPosition;
        this.xPostion = xPostion;

        this.divider.style.height = this.dividerHeight + "px";
        this.divider.style.width = this.dividerWidth + "px";
        this.divider.style.position = "absolute"
        this.divider.style.top = this.yPosition + "px";
        this.divider.style.left = this.xPostion + "%";
        this.divider.classList.add("divider");
    }

    startMoving(){
        setInterval(()=>{
        this.yPosition = this.yPosition + this.velocity;
        this.divider.style.top = this.yPosition + "px";
        } ,this.dividerSpeed);
    }
}