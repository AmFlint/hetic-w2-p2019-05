import Wind from './wind-lib/src/Wind';

window.onload = function(){
    const wind = new Wind();
    document.body.appendChild(wind.getFormatedWind());
}
