const songs = [
    {
        "title": "Біля серця",
        "author": "KOLA",
        "img": "bilya_serdcya.jpeg",
        "track": "bilya_serdcya.mp3",
        "duration": 136
    },
    {
        "title": "Місто весни (feat. Один в каное)",
        "author": "Океан Ельзи",
        "img": "misto_vesn.jpeg",
        "track": "misto_vesn.mp3",
        "duration": 252
    },
    {
        "title": "Чорне і біле",
        "author": "Зозуля",
        "img": "chorne_bile.jpeg",
        "track": "chorne_bile.mp3",
        "duration": 227
    },
    {
        "title": "Чути гімн",
        "author": "Skofka",
        "img": "chut_gimn.jpeg",
        "track": "chut_gimn.mp3",
        "duration": 148
    },
    {
        "title": "В Пустій Кімнаті",
        "author": "Yaktak, Jerry Heil",
        "img": "v_pusti_kimnati.jpeg",
        "track": "v_pusti_kimnati.mp3",
        "duration": 165
    },
    {
        "title": "Гей, соколи!",
        "author": "Олександр Пономарьов та Mykhailo Khoma",
        "img": "gey_sokoly.jpeg",
        "track": "gey_sokoly.mp3",
        "duration": 225
    },
    {
        "title": "Три слова",
        "author": "Kozak System",
        "img": "tri_slova.jpeg",
        "track": "tri_slova.mp3",
        "duration": 240
    },
    {
        "title": "Пісня Сміливих Дівчат",
        "author": "KAZKA",
        "img": "pisnya_divchat.jpeg",
        "track": "pisnya_divchat.mp3",
        "duration": 186
    }
];

const ACTIVE_SONG_CLASS = 'music-player__song--active';
const BIG_MODE_CLASS_NAME = 'music-player__slider--big';
const ACTIVE_IMAGE_CLASS = 'music-player__slider-image--active';
const NEXT_IMAGE_CLASS = 'music-player__slider-image--next';
const BACK_IMAGE_CLASS = 'music-player__slider-image--back';
const SLIDE_ANIMATION_MODE = 'music-player__slider-images--slide';
const PAUSE_CLASSNAME = 'music-player__play-toggle--pause';
const PLAY_CLASSNAME = 'music-player__play-toggle--play';
const ANIMATION_MODE = {
    SLIDE: 'slide',
    FADE: 'fade',
}
const MODES = {
    BIG: 'big',
    SMALL: 'small'
}

const colorThief = new ColorThief();
const $player = document.querySelector('.music-player');
const $playlist = $player.querySelector('.music-player__playlist');
const $slider = $player.querySelector('.music-player__slider');
const $playPause = $slider.querySelector('.music-player__play-toggle');
const $sliderImagesBody = $slider.querySelector('.music-player__slider-images');
const $backBtn = $slider.querySelector('.music-player__switch-button--back');
const $nextBtn = $slider.querySelector('.music-player__switch-button--next');
const $progress = $player.querySelector('.music-player__progress');
const $progressWrapper = $progress.querySelector('.music-player__progress-wrapper');
const $broadcast = $player.querySelector('.music-player__broadcast');
const $title = $slider.querySelector('.music-player__title');
const $author = $slider.querySelector('.music-player__author');
const $audio = $player.querySelector('.music-player__audio');
let mode = $slider.classList.contains(BIG_MODE_CLASS_NAME)
        ? MODES.BIG
        : MODES.SMALL;
let currentSongIndex = 0;

clearPlaylist();

const $songs = songs.map(renderSong);

$playlist.append(...$songs);

clearSliderImagesBody();

const $images = songs.map(renderImage);

$sliderImagesBody.append(...$images);

$broadcast.addEventListener('click', tooglePlayerMode);
$title.addEventListener('click', tooglePlayerMode);
$author.addEventListener('click', tooglePlayerMode);

render();

// additional functions

function tooglePlayerMode() {
    if (mode === MODES.BIG) {
        mode = MODES.SMALL;
    } else {
        mode = MODES.BIG;
    }

    render();
}

function clearSliderImagesBody() {
    $sliderImagesBody.innerText = '';
}

function clearPlaylist() {
    $playlist.innerText = '';
}

function renderSong(song) {
    const { title, author, img, duration } = song;
    const $li = document.createElement('li');
    const ss = duration % 60;
    const mm = Math.floor(duration / 60);

    $li.className = 'music-player__song';
    $li.innerHTML = `
        <img
            alt=""
            src="songs/${img}"
            class="music-player__song-img">
        <div class="music-player__song-title music-player__title">
            ${title}
        </div>
        <div class="music-player__song-author music-player__author">
            ${author}
        </div>
        <div class="music-player__song-duration">
            ${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}
        </div>
    `;

    return $li;
}

function renderImage(song) {
    const $img = document.createElement('img');

    $img.src = `songs/${song.img}`;
    $img.className = 'music-player__slider-image';
    $img.alt = '';

    return $img;
}

function render() {
    $images.forEach(function ($img, idx) {
        if (idx < currentSongIndex) {
            $img.classList.add(BACK_IMAGE_CLASS);
            $img.classList.remove(NEXT_IMAGE_CLASS);
            $img.classList.remove(ACTIVE_IMAGE_CLASS);
        } else if (idx === currentSongIndex) {
            $img.classList.remove(BACK_IMAGE_CLASS);
            $img.classList.remove(NEXT_IMAGE_CLASS);
            $img.classList.add(ACTIVE_IMAGE_CLASS);
        } else if (idx > currentSongIndex) {
            $img.classList.remove(BACK_IMAGE_CLASS);
            $img.classList.add(NEXT_IMAGE_CLASS);
            $img.classList.remove(ACTIVE_IMAGE_CLASS);
        }
    });

    $songs.forEach(function ($song, idx) {
        if (idx === currentSongIndex) {
            $song.classList.add(ACTIVE_SONG_CLASS);
        } else {
            $song.classList.remove(ACTIVE_SONG_CLASS);
        }
    });

    if (mode === MODES.BIG) {
        $slider.classList.add(BIG_MODE_CLASS_NAME);
    } else {
        $slider.classList.remove(BIG_MODE_CLASS_NAME);
    }
}
