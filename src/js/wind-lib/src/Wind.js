import Shape from './Shape';

class Wind {
    constructor() {
        const speed = ["slow", "medium", "fast"];
        let pseudoRand = this.getRandomInt(1,3);
        this.shape = new Shape(speed[pseudoRand]);
    }

    getFormatedWind() {
        let container = document.createElement('div');
        container.classList.add("wrapper-wind");
        container.appendChild(this.shape.getWindShape());

        return container;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}
export default Wind;