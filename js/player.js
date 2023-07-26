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
