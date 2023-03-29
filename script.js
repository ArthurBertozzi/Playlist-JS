// A referência da div não pode mudar por isso será const
// Pegamos o elemento com o ID do html do document
const songName = document.getElementById("song-name"); // label do nome da música
const song = document.getElementById("audio"); // música
const play = document.getElementById("play"); // botão de play
const bandName = document.getElementById("band-name"); // nome da banda
const cover = document.getElementById("cover"); // capa do disco
const next = document.getElementById("next"); // capa do disco
const previous = document.getElementById("previous"); // capa do disco
const currentProgress = document.getElementById("current-progress"); // progresso atual da barra de progresso
const progressContainer = document.getElementById("progress-container"); // container de progresso
const shuffleButton = document.getElementById("shuffle"); // botão de shuffle
const repeatButton = document.getElementById("repeat"); // botão de repeat
const totalTime = document.getElementById("total-time"); // tempo total da musica
const songTime = document.getElementById("song-time"); //  tempo da musica
const likeButton = document.getElementById("like"); //  tempo da musica


// Criar os objetos das musicas

const asYourWere = {
    songName : 'As You Were',
    artist : 'TrackTribe',
    file: 'as_you_were',
    liked: false
};
const boomBapFlick = {
    songName : 'Boom Bap Flick',
    artist : 'Quincas Moreira',
    file: 'boom_bap_flick',
    liked: false
};
const cantHide = {
    songName : "Can't Hide",
    artist : 'Otis Mcdonald',
    file: 'cant_hide',
    liked: false
};

// Criar um array de músicas -> pegamos do localStorage que salvamos para obter as opções de Like
// pode dar erro se não tiver assim usamos o ?? operador de coalescencia nula
// ou seja se não tiver no local storage fazemos outra coisa
const playlist = JSON.parse(localStorage.getItem('playlist')) ?? [asYourWere, boomBapFlick, cantHide];
// criar uma playlist para receber a função de shuffle
let sortedPlaylist = [...playlist]

// Criar uma variavel de indice da playlist
let index = 0

// pegamos a caracteristica do texto interior do elemento referenciado
// E alteramos o valor da caracteristica
// criar função para inicializar a aplicação com os dados corretos e troca de musica
function initializeSong() {
    cover.src = `images/${sortedPlaylist[index].file}.webp`
    song.src = `songs/${sortedPlaylist[index].file}.mp3`
    songName.innerText = sortedPlaylist[index].songName
    bandName.innerText = sortedPlaylist[index].artist
    // verificamos se a musica está com o botão de like ativo ou não
    likeButtonRender();
}

/*
Evento:
    Dom emite eventos que podemos criar ações com base nesses eventos
    Exemplo: Evento de clique
*/

// Variavel auxiliar para controle da funcionalidade play/pause
let isPlaying = false;

// Para tocar a musica -> element.play() e para pausar element.pause()
// Função de play
function playSong() {
    // pesquisar pelo seletor -> exemplo seletores css
    // nesse caso pesquisamos o que está dentro do botão de play -> icone de play
    // pesquisamos a classe bi e acessamos os atributos dele (lista de classes)
    // removemos e adicionamos as classes para trocar a aparencia e funcionalidade do botao
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');

    // iniciamos a musica
    song.play();

    // alteramos a variavel auxiliar
    isPlaying = true;
}

//  Função de pause
function pauseSong() {
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    // paramos a musica
    song.pause();
    isPlaying = false;
}

// função para decisão de play/pause
function playPauseDecider() {
    if (!isPlaying) {
        return playSong();
    } else {
        return pauseSong();
    }   
};

// função de voltar a musica

function previousSong() {
    if (index === 0) {
        index = sortedPlaylist.length - 1;
    } else {
        index -= 1
    }
    initializeSong();
    playSong();
};

function nextSong() {
    if (index === sortedPlaylist.length - 1) {
        index = 0;
    } else {
        index += 1
    }
    initializeSong();
    playSong();
};

// função de atualizar a barra de progresso
function updateProgressBar() {
    // quanto da musica ja tocou ->  song.currentTime
    // duração total da musica -> song.duration
    const barWidth = (song.currentTime / song.duration) * 100;
    // definir um valor para um atributo css acessando o atributo style do elemento
    currentProgress.style.setProperty('--progress', `${barWidth}%`); 
}

// função de clique da barra de progresso
// pegamos o evento de clique para saber a posição do clique na div
function jumpTo(event) {
    // armazenar a largura do container de progresso
    const width = progressContainer.clientWidth;
    // offsetX nos da a posição do clique em pixels comparado ao inicio da div na esquerda
    const clickPosition = event.offsetX;
    // calculo para descobrir o tempo da musica onde precisaremos ir após o clique
    const jumpToTime = (clickPosition/width) * song.duration;
    console.log(jumpToTime)
    // atualizar a musica com o tempo pós clique
    // automaticamente vai triggar o evento de timeupdate e atualizar a barra de progresso
    song.currentTime = jumpToTime;
}

// shuffle da musica
let isShuffled = false

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    // embaralhamos de trás para frente
    let currentIndex = size - 1;
    // enquanto o index seja maior que o 0
    while (currentIndex > 0) {
        // sortear usando o Math.random e multiplicamos pelo size para aumentar o limite do random (naturalmente via até 1)
        // e arredondamos para baixo
        let randomIndex = Math.floor(Math.random() * size);
        // copiar o valor inicial de cada iteração
        let aux = preShuffleArray[currentIndex];
        // substituimos um elemento do array por outro 
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        // trocar a posição
        preShuffleArray[randomIndex] = aux;

        currentIndex -= 1;
    }
    console.log(preShuffleArray)
}

function shuffleButtonClicked() {
    if (!isShuffled) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active')
    } else {
        isShuffled = false;
        // retorna a playlist original
        sortedPlaylist = [...playlist]
        shuffleButton.classList.remove('button-active')
    }
};

// função de botão repeat
let repeatOn = false;

function repeatButtonClicked() {
    if (!repeatOn) {
        repeatOn = true;
        repeatButton.classList.add('button-active')
    } else {
        repeatOn = false;
        repeatButton.classList.remove('button-active')
    }
}

// função de proxima musica ou repeat

function nextOrRepeat() {
    if (!repeatOn) {
        return nextSong();
    } else {
        return playSong();
    }
}

// funções do temporizador da barra de progresso

function toHHMMSS(originalNumber) { // função de formatação do temporizador
    let hours = Math.floor(originalNumber / 3600); // número de horas
    let minutes = Math.floor((originalNumber - hours * 3600) / 60) // número de minutos
    let seconds = Math.floor(originalNumber - hours * 3600 - minutes * 60) // número de segundos restantes

    // formatamos os números como string usando toString
    // e o método padStart que formata a qtd de algarismos e se tiver menos que 2 algarismos preenchemos com 0
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
} 


function updateCurrentTime() {
    let auxCurrentTime = toHHMMSS(song.currentTime)
    songTime.innerText = auxCurrentTime;
}

function updateTotalTime() {
    let auxTotalTime = toHHMMSS(song.duration)
    totalTime.innerText = auxTotalTime;
}

// função de interação com o botão de like e de verificação do like
// precisaremos salvar a opção de like no local storage
// e usaremos os atributos de like nos objetos das musicas
let isLiked = false;

function likeButtonRender() { // será rodada no initialize.song()
    if (sortedPlaylist[index].liked) {
        likeButton.querySelector('.bi').classList.remove('bi-heart')
        likeButton.querySelector('.bi').classList.add('bi-heart-fill')
        likeButton.querySelector('.bi').classList.add('button-active')
    } else {
        likeButton.querySelector('.bi').classList.add('bi-heart')
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill')
        likeButton.querySelector('.bi').classList.remove('button-active')
    }
}

function likeButtonClicked() { // ao clicar no botão
    if(!sortedPlaylist[index].liked) {
        sortedPlaylist[index].liked = true
    } else {
        sortedPlaylist[index].liked = false
    }

    likeButtonRender()
    // salvar no local storage a opção de Like -> precisamos passar os objetos para texto
    localStorage.setItem('playlist', JSON.stringify(playlist))
}

// carregamento dos dados iniciais da musica de indice 0
initializeSong();

// Capacidade de Escutar eventos (addEventListener)
// Recebe 2 argumentos -> Tipo de evento e a função para ser executada
play.addEventListener("click", playPauseDecider);

// botão de voltar a musica
previous.addEventListener("click", previousSong);

// botao de proxima musica
next.addEventListener("click", nextSong);

/* 
timeupdate avisa o progresso do arquivo de audio -> vinculamos a função de progresso da barra
a cada 1s a barra será atualizada
e também adicionamos a função de atualizar o tempo atual da progress bar usando o mesmo evento
Podemos juntar as 2 funcionalidades em uma função somente
*/
song.addEventListener("timeupdate", updateProgressBar);
song.addEventListener("timeupdate", updateCurrentTime);

// evento de finalização da musica para passar para a proxima
song.addEventListener('ended', nextOrRepeat)

// evento de carregamento das informações de musica -> para preencher o tempo total da musica na progressbar
// só vai rodar uma vez nesse caso (quando os dados da música forem carregados)
song.addEventListener('loadedmetadata', updateTotalTime)

// evento de clique da barra de progresso
progressContainer.addEventListener('click', jumpTo);

// botão de shuffle
shuffleButton.addEventListener('click', shuffleButtonClicked)

// botão de repeat
repeatButton.addEventListener('click', repeatButtonClicked)

// botão de like
likeButton.addEventListener('click', likeButtonClicked)