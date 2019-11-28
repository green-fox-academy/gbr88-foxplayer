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
let remainingTime = document.getElementById('rTime');
let totalTime = document.getElementById('tTime');
let audioPlayer = document.getElementById('audioPlayer');

volumeBar.addEventListener('change', function(evt) {
    player.volume = parseInt(evt.target.value) / 10;
});

player.addEventListener('timeupdate', function() {
    let rTime = parseInt(player.duration - player.currentTime);
    let tTime = parseInt(player.duration);
    if (player.currentTime > 0) {
        updateProgressBar();
        remainingTime.innerText = seconds2time(rTime);
        totalTime.innerText = seconds2time(tTime)
    }
});

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
        totalTime.innerText = player.duration;
        if (player.paused || player.ended) {
            changeButtonType(btnPlayPause, 'pause');
            player.play();
        }
    }
}

function previous() {
    if (currentTrack > 0) {
        currentTrack--;
        progressBar.value = 0;
        source[0].src = tracks[currentTrack].src;
        player.load();
        totalTime.innerText = player.duration;
        if (player.paused || player.ended) {
            changeButtonType(btnPlayPause, 'pause');
            player.play();
        }
    }
}

function updateProgressBar() {
    let percentage = Math.floor((100 / player.duration) * player.currentTime);
    progressBar.value = percentage;
    progressBar.innerHTML = progressBar.title = percentage + '% played';
}

function seek(e) {
    let percent = e.offsetX / this.offsetWidth;
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

function seconds2time(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);
    let seconds = seconds - (hours * 3600) - (minutes * 60);
    let time = "";

    if (hours != 0) {
        time = hours + ":";
    }
    if (minutes != 0 || time !== "") {
        minutes = (minutes < 10 && time !== "") ? "0" + minutes : String(minutes);
        time += minutes + ":";
    }
    if (time === "") {
        time = seconds + "s";
    } else {
        time += (seconds < 10) ? "0" + seconds : String(seconds);
    }
    return time;
}