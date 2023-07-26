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

const $images = songs.map(renderSliderImage);

clearSliderImages();

$sliderImagesBody.append(...$images);

$broadcast.addEventListener('click', switchToSmall);
$title.addEventListener('click', switchToBig);
$author.addEventListener('click', switchToBig);
$backBtn.addEventListener('click', switchBackSong);
$nextBtn.addEventListener('click', switchNextSong);
$playPause.addEventListener('click', playToggle);
$audio.addEventListener('timeupdate', timeupdate);
$progress.addEventListener('click', changeProgress);
$audio.addEventListener('ended', switchNextSong.bind(null, true));

function switchToBig() {
    mode = MODES.BIG;
    render();
}

function switchToSmall() {
    mode = MODES.SMALL;
    render();
}

function clearPlaylist() {
    $playlist.innerText = '';
}

function clearSliderImages() {
    $sliderImagesBody.innerText = '';
}

function changeProgress(e) {
    const mainRect = $progressWrapper.getBoundingClientRect();
    const { clientX } = e;
    const value = Math.min( 1, Math.max(0 , (clientX - mainRect.left) / mainRect.width));
    const time = $audio.duration * value;

    $audio.currentTime = time;
}

function changeCurrentSong(songIndex, playNext = false) {
    const newSongIndex = Math.max(0, Math.min(songIndex, songs.length - 1));

    if (currentSongIndex === newSongIndex) {
        return ;
    }

    currentSongIndex = newSongIndex;

    const currentSong = songs[currentSongIndex];
    const paused = $audio.paused;
    const $image = $images[currentSongIndex]

    $audio.src = `songs/${currentSong.track}`;
    $audio.currentTime = 0;

    if (!paused || playNext) {
        $audio.play();
    }

    extractColor($image)
        .then((palette) => {
            const bgColor = `rgba(${palette[0].join(",")}, .568)`;

            document.body.style.setProperty('--body-bg', bgColor);
        })

    render();
}

// NOTE: https://dev.to/mcanam/how-to-make-adaptive-card-color-depending-on-image-background-555b
function extractColor(image) {
    return new Promise((resolve) => {
        const getPalette = () => {
            return colorThief.getPalette(image, 4);
        };

        if (image.complete) {
            return resolve(getPalette());
        }

        image.onload = () => {
            resolve(getPalette());
        };
    });
}

function timeupdate(e) {
    let progressValue = $audio.currentTime*100 / $audio.duration;

    if (isNaN(progressValue)) {
        progressValue = 0;
    }

    $progress.style.setProperty('--value', `${progressValue.toFixed(3)}%`);
}

function switchSong(songIndex) {
    changeCurrentSong(songIndex);
}

function switchBackSong() {
    changeCurrentSong(currentSongIndex - 1);
}

function switchNextSong(playNext = false) {
    changeCurrentSong(currentSongIndex + 1, playNext);
}

function renderSong(song, songIndex) {
    const $li = document.createElement('li');
    const { duration } = song;
    const mm = Math.floor(duration / 60);
    const ss = duration % 60;

    $li.className = 'music-player__song';

    $li.innerHTML = `
        <img
            src="songs/${song.img}"
            class="music-player__song-img">
        <div class="music-player__song-title music-player__title">
            ${song.title}
        </div>
        <div class="music-player__song-author music-player__author">
            ${song.author}
        </div>
        <div class="music-player__song-duration">
            ${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}
        </div>
    `;

    $li.addEventListener('click', switchSong.bind(null, songIndex));

    return $li;
}

function playToggle() {
    if ($audio.paused) {
        $audio.play();
    } else {
        $audio.pause();
    }

    render();
}

function renderSliderImage(song) {
    const $el = document.createElement('img');

    $el.className = 'music-player__slider-image';
    $el.src = `songs/${song.img}`;
    $el.alt = '';

    return $el;
}

function render() {
    const currentSong = songs[currentSongIndex];
    const { title, author } = currentSong;

    $title.innerText = title;
    $author.innerText = author;

    if (mode === MODES.BIG) {
        $slider.classList.add(BIG_MODE_CLASS_NAME);
    } else if (mode === MODES.SMALL) {
        $slider.classList.remove(BIG_MODE_CLASS_NAME);
    }

    $images.forEach(function ($image, idx) {
        const $currentSong = $songs[idx];

        $currentSong.classList.remove(ACTIVE_SONG_CLASS);

        if (idx < currentSongIndex) {
            $image.classList.remove(ACTIVE_IMAGE_CLASS);
            $image.classList.remove(NEXT_IMAGE_CLASS);
            $image.classList.add(BACK_IMAGE_CLASS);
        } else if (idx === currentSongIndex) {
            $image.classList.add(ACTIVE_IMAGE_CLASS);
            $image.classList.remove(NEXT_IMAGE_CLASS);
            $image.classList.remove(BACK_IMAGE_CLASS);
            $currentSong.classList.add(ACTIVE_SONG_CLASS);
        } else if (idx > currentSongIndex) {
            $image.classList.remove(ACTIVE_IMAGE_CLASS);
            $image.classList.add(NEXT_IMAGE_CLASS);
            $image.classList.remove(BACK_IMAGE_CLASS);
        }
    });

    if ($audio.paused) {
        $playPause.classList.remove(PAUSE_CLASSNAME);
        $playPause.classList.add(PLAY_CLASSNAME);
    } else {
        $playPause.classList.add(PAUSE_CLASSNAME);
        $playPause.classList.remove(PLAY_CLASSNAME);
    }
}

render();
