import Wind from './wind-lib/src/Wind';
import Backup from './wind-lib/src/Backup';

window.onload = function(){
    const interval = Wind.getRandomInt(4000, 12000);

    window.setInterval(function () {
        const speed = ["slow", "medium", "fast"];
        const delegate = new Backup(speed[Wind.getRandomInt(1,3)]);
        const wind = new Wind(delegate);
        let img = wind.getFormatedWind();

        document.body.appendChild(img);
        let start;
        if (Math.random() > 0.4) {
            start = 0;
        } else {
            start = 25;
        }
        let i = 0;
        // As webpack slow down things way too much,
        // 1s is spent to let time to img to be displayed
        window.setTimeout(function () {
            const top = window.scrollY;
            const bottom = top + window.innerHeight;
            img.setAttribute('style', 'top:' + Wind.getRandomInt(top, bottom) +'px');
            img.firstChild.classList.add('visible');
            img.style.left = start + "%";
            window.setInterval(function () {
                if (i > 45) {
                    window.clearInterval(this);
                    if (null !== img) {
                        document.body.removeChild(img);
                        img = null;
                    }
                    //document.body.removeChild(img);
                } else {
                    img.style.left = (i+start) + "%";
                    i++;
                }
            },18)
        }, 1000);
    }, interval);

};
