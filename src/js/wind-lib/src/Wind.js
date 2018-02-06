import Shape from './Shape';

export default class Wind {
    constructor(delegate = null) {
        const speed = ["slow", "medium", "fast"];
        if (null === delegate) {
            let pseudoRand = this.getRandomInt(1,3);
            this.shape = new Shape(speed[pseudoRand]);
        } else {
            this.shape = delegate;
        }
    }

    getFormatedWind() {
        let container = document.createElement('div');
        container.classList.add("wrapper-wind");
        container.appendChild(this.shape.getWindShape());

        return container;
    }

    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
