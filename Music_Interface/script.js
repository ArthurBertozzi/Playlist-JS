const asYourWere = {
    id: '0',
    songName : 'As You Were',
    artist : 'TrackTribe',
    Album: "n/a",
    coverFile: 'as_you_were'
};
const boomBapFlick = {
    id: '1',
    songName : 'Boom Bap Flick',
    artist : 'Quincas Moreira',
    Album: "n/a",
    coverFile: 'boom_bap_flick'
};
const cantHide = {
    id: '2',
    songName : "Can't Hide",
    artist : 'Otis Mcdonald',
    Album: "n/a",
    coverFile: 'cant_hide'
};

const musicLibrary = [
    asYourWere,
    boomBapFlick,
    cantHide
];

let songs = [
    ...musicLibrary
];

const pageBody = document.getElementById('page-body');
const searchTerm = document.getElementById('search-term');
const searchButton= document.getElementById('search-button');

function loadLibrary() {
    pageBody.innerHTML = '';
    for (let index = 0; index < songs.length ; index ++) {
        pageBody.innerHTML += `
        <div class="card d-flex flex-column align-items-center" style="width: 18rem; height: 30rem;">
            <img src="images/covers/${songs[index].coverFile}.webp" class="card-img-top" alt="Capa do Disco"/>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${songs[index].songName}</h5>
                <p class="card-text">${songs[index].Album}</p>
                <p class="card-text">${songs[index].artist}</p>
                <button  class="btn btn-outline-success"><i class="bi bi-plus-circle"></i></button>
            </div>    
        </div>
    `
    };
};

function serchClick() {
    if (!searchTerm.value) {
        songs = [...musicLibrary]
        loadLibrary()
        return
    } else {
        songs = songs.filter(song => 
            song.songName.includes(searchTerm.value) ||
            song.Album.includes(searchTerm.value) ||
            song.artist.includes(searchTerm.value))
        loadLibrary()
    }
};

function resetFilter() {
    if (searchTerm.value !== '') return;
    songs = [...musicLibrary];
    loadLibrary();
};

searchButton.addEventListener('click', serchClick)
searchTerm.addEventListener('input', resetFilter)

loadLibrary();