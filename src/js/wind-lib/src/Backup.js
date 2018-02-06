import Shape from "./Shape";

export default class Backup extends Shape {
    constructor(speed){
        super(speed);
        this.images = [
            "../assets/png/wind1.png",
            "../assets/png/wind2.png"
        ];
        this.image = this.images[this.kind];
    }

    getWindShape() {
        let img = document.createElement('img');
        img.classList.add('wrapper-wind__backup');
        img.classList.add(this.speed);
        if (0 === this.kind) {
            img.src = require("../assets/png/wind1.png");
        } else if (1 === this.kind) {
            img.src = require("../assets/png/wind2.png");
        }

        return img;
    }
}