let tracks = [{
        src: "../assets/src/Celldweller - End of an Empire.mp3"
    },
    {
        src: "../assets/src/The Prodigy - Warriors Dance.mp3"
    },
    {
        src: "../assets/src/Noisia - Liliths Club.mp3"
    }
];

let currentTrack = 0;
let player = document.getElementById('music');
let source = document.getElementsByTagName('source');
let btnPlayPause = document.getElementById('btnPlayPause');
let btnMute = document.getElementById('btnMute');
let progressBar = document.getElementById('progressBar');
let volumeBar = document.getElementById('volumeBar');

volumeBar.addEventListener("change", function(evt) {
    player.volume = parseInt(evt.target.value) / 10;
});

player.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('click', seek);

function load() {
    currentTrack = 0;
    progressBar.value = 0;
    source[0].src = tracks[currentTrack].src;
    player.load();
}

function next() {
    if (currentTrack < tracks.length - 1) {
        currentTrack++;
        progressBar.value = 0;
        source[0].src = tracks[currentTrack].src;
        player.load();
        player.play();
    }
}

function previous() {
    if (currentTrack > 0) {
        currentTrack--;
        progressBar.value = 0;
        source[0].src = tracks[currentTrack].src;
        player.load();
        player.play();
    }
}

function updateProgressBar() {
    var percentage = Math.floor((100 / player.duration) * player.currentTime);
    progressBar.value = percentage;
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
        changeButtonType(btnPlayPause, 'pause');
        player.play();
    } else {
        changeButtonType(btnPlayPause, 'play');
        player.pause();
    }
}

function muteVolume() {
    if (player.muted) {
        changeButtonType(btnMute, 'mute');
        player.muted = false;
    } else {
        changeButtonType(btnMute, 'unmute');
        player.muted = true;
    }
}

function changeButtonType(btn, value) {
    btn.title = value;
    btn.innerHTML = value;
    btn.className = value;
}