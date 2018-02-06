window.addEventListener('load', function() {
    const switchBtn = document.querySelector('.consoles-btn--switch');
    const wiiBtn = document.querySelector('#wii');
    const link = document.querySelector('#console-link');
        
    switchBtn.addEventListener('click', switchEvent);
    wiiBtn.addEventListener('click', switchEvent);
    
    // Change Consoles Link button's label to new text
    function changelinkLabel(text) {
        link.textContent = text;
    }

    // Change consoles's link destination
    function changelinkDestination(destination) {
        link.href = destination;
    }

    // Change link label according to which button was clicked
    function changelinkElementFromBtn(btnElement) {
        let text = 'Commander la ';
        let destination = '';

        if (isSwitchBtn(btnElement)) {
            text += 'Nintendo Switch';
            destination = 'https://jeux-video.fnac.com/s470484/Nintendo-Switch';
        } else {
            text += 'Wii U ';
            destination = 'https://jeux-video.fnac.com/s302189/Wii-U';
        }

        // change Link's label and destination accordingly
        changelinkLabel(text);
        changelinkDestination(destination);
    }
    
    // Add the active class to given button and remove it from the other one
    function changeActiveButton(btnElement) {
        if (isSwitchBtn(btnElement)) {
            switchBtn.classList.add('consoles-btn--active');
            wiiBtn.classList.remove('consoles-btn--active');
        } else {
            switchBtn.classList.remove('consoles-btn--active');
            wiiBtn.classList.add('consoles-btn--active');
        }
    }

    // Return wether the given button is the switch Button
    function isSwitchBtn(btnElement) {
        return btnElement === switchBtn;
    }
    
    function switchEvent(event) {
        // prevent Linking event from happening
        event.preventDefault();

        // leave this function if user clicked on active button
        if (this.classList.contains('.consoles-btn--active')) {
            return;
        }
    
        // Change active class for buttons
        changeActiveButton(this);
        // change Link label
        changelinkElementFromBtn(this);
    }
    
});