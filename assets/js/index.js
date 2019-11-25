let player = document.getElementById('music'); // id for audio element
let btnPlayPause = document.getElementById('btnPlayPause');
let btnMute = document.getElementById('btnMute');
let progressBar = document.getElementById('progress-bar');
let volumeBar = document.getElementById('volume-bar');

volumeBar.addEventListener("change", function(evt) {
    player.volume = parseInt(evt.target.value) / 10;
});

player.addEventListener('timeupdate', updateProgressBar, false);

progressBar.addEventListener("click", seek);

function updateProgressBar() {
    // Work out how much of the media has played via the duration and currentTime parameters
    var percentage = Math.floor((100 / player.duration) * player.currentTime);
    // Update the progress bar's value
    progressBar.value = percentage;
    // Update the progress bar's text (for browsers that don't support the progress element)
    progressBar.innerHTML = progressBar.title = percentage + '% played';
}

function seek(e) {
    var percent = e.offsetX / this.offsetWidth;
    player.currentTime = percent * player.duration;
    e.target.value = Math.floor(percent / 100);
    e.target.innerHTML = progressBar.value + '% played';
}

function playPause() {
    if (player.paused || player.ended) {
        // Change the button to a pause button
        changeButtonType(btnPlayPause, 'pause');
        player.play();
    } else {
        // Change the button to a play button
        changeButtonType(btnPlayPause, 'play');
        player.pause();
    }
}

function muteVolume() {
    if (player.muted) {
        // Change the button to a mute button
        changeButtonType(btnMute, 'mute');
        player.muted = false;
    } else {
        // Change the button to an unmute button
        changeButtonType(btnMute, 'unmute');
        player.muted = true;
    }
}

// Updates a button's title, innerHTML and CSS class
function changeButtonType(btn, value) {
    btn.title = value;
    btn.innerHTML = value;
    btn.className = value;
}