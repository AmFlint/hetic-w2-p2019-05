class Shape {
	constructor(speed){
        this.container = document.createElement('div');
        this.fill = 0;
        this.stroke = 1;
        this.ids = [];
        this.current = 0;
        this.slow = [8,6];
        this.medium = [4,3];
        this.fast = [2,1];
        this.shapes = [
            require("../assets/json/wind1.json")
			//,
            //require("../assets/json/wind2.json")
        ];
		this.speed = speed;
		this.container.classList.add('container--wind');
		const rand = Math.random();
		let index;
		if (rand > 0.66) {
			index = 0;
        } else {
			index = 0;
        }
        this.svg = this.shapes[index];
		this.speedIndex = index;
	}

    uuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    getWindShape() {
        this.ids = [this.uuid(), this.uuid()];

        return this.display(this.svg);
	}

	display(elt) {
		let tag = document.createElement(elt.tag);
		for (let attr in elt.attrs) {
			if (undefined !== attr) {
				tag.setAttribute(attr, elt.attrs[attr]);
			}
		}
		if (elt.id) {
			tag.id = this.ids[this.current++];
		}
		if (elt.rattached) {
			let baseStart = "url(#";
			let baseEnd = ")";
			tag.fill = baseStart + this.ids[this.fill] + baseEnd;
			tag.stroke = baseStart + this.ids[this.stroke] + baseEnd;
		}
		if (elt.dur) {
			tag.setAttribute('dur', this[this.speed][this.speedIndex]);
		}
		if ( 0 < elt.children.length ) {
            elt.children.forEach(function (child) {
                tag.appendChild(this.display(child));
            }, this);
        }

		return tag;
	}
}
export default Shape;