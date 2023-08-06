
// Grab DOM elements
const video = document.querySelector(".video");
const playButton = document.querySelector(".play");
const playButtonIcon = playButton.querySelector("i");
const stopButton = document.querySelector(".stop");
const progressBar = document.querySelector(".progress");
const timestamp = document.querySelector(".timestamp");

const videoFondo = document.querySelector(".videoFondo");

// Escuchar eventos
video.addEventListener("click", playPauseVideo);
video.addEventListener("contextmenu", noControlsMenu);
progressBar.addEventListener("change", setVideoProgress);
playButton.addEventListener("click", playPauseVideo);
stopButton.addEventListener("click", stopVideo);
video.addEventListener("timeupdate", updateVideoProgress);


window.onfocus = function (){
    videoFondo.currentTime = Math.ceil(video.currentTime);
}

window.onblur = function (){
    videoFondo.currentTime = Math.ceil(video.currentTime);
}

// Funciones de Utilidad
function playPauseVideo(){
    // if(video.paused){
    //     video.play();
    // } else {
    //     video.pause();
    // }

    video[video.paused ? "play" : "pause"]();
    videoFondo[videoFondo.paused ? "play" : "pause"]();
    playButtonToggleIcon()
}

function playButtonToggleIcon(){
    // Si el video está pausado
    if (video.paused) {
        // Cambiar de iconos
        playButtonIcon.classList.remove("fa-pause");
        playButtonIcon.classList.add("fa-play");
    } else {
        playButtonIcon.classList.remove("fa-play");
        playButtonIcon.classList.add("fa-pause");
    }
}

function noControlsMenu(ev){
    ev.preventDefault();
    return false;
}

function stopVideo() {
    video.pause();
    video.currentTime = 0;

    videoFondo.pause();
    videoFondo.currentTime = 0;

    playButtonToggleIcon();
    progressBar.value = 0;
}

function setVideoProgress(){
    // Calcular el valor de la barra * la duracion del video total / 100 para sacar el tiempo actual
    let currentTime = Number((progressBar.value * video.duration) / 100);
    // Actualizar el tiempo actual del video
    video.currentTime = currentTime;
    videoFondo.currentTime = video.currentTime;
}

function updateVideoProgress() {

    // Actualizar la el valor de la barra de progreso -> tiempo actual / tiempo total * 100 para sacar el %
    progressBar.value = Number((video.currentTime / video.duration) * 100);

    //Dar estilo a la barra de progreso en lo que avanzando el tiempo de video
    progressBar.style.backgroundSize = progressBar.value + "%" +  "auto";

    // Sacar los minutos y segundos del tiempo actual del video
    //Sacar el minuto del video
    let minutos = Math.floor(video.currentTime / 60);

    // Calculo para sacar los segundos

    // Tiempo actual en segundos / 60 = [minutos].decimales o solo [minutos]
    // -> 60 * [minutos] = [segundos_totales] (Es decir, multiplicar 60 segundos por cada [minuto])
    // -> Tiempo actual en segundos - [segundos_totales] = [segundos_exactos] (Es decir, el segundo exacto y actual de ese momento del video)

    // Esto se haria con el % -> modulo

    let segundos = Math.floor(video.currentTime % 60);

    
    //Actualizar el valor del tiempo en la vista

    // Si minutos en vista es menor que 10
    if(minutos < 10){
        // Que se ponga un 0 de mas al lado del minuto actual
        minutos = "0" + minutos;
    }

    // Si los segundos es menor que 10 en vista
    if (segundos < 10) {
        //Se ponga un 0 de mas al lado del segundo actual
        segundos = "0" + segundos;
    }
    
    timestamp.textContent = `${minutos}:${segundos}`;

    //Si el video se ha terminado, actualizar el icono de reproducir / pausa
    if(video.currentTime == video.duration){
        playButtonToggleIcon();
    } 
    
}