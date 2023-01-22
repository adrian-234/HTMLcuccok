const musics = [
    {artist:"Alfons", title:"Ganjaman", src:"Css gyak/Zenek/Alfons - Ganjaman.mp3"},
    {artist:"Jesse Bloch", title:"Ricky Martin - Livin’ La Vida Loca", src:"Css gyak/Zenek/Ricky Martin - Livin’ La Vida Loca (Jesse Bloch Edit) [FREE DL BELOW].mp3"},
    {artist:"Sub Bass Monster", title:"Négy ütem", src:"Css gyak/Zenek/Sub Bass Monster - Négy ütem.mp3"},
    {artist:"Will Sparks", title:"Ah Yeah So What (feat. Wiley & Elen Levon) (Bass Boosted)", src:"Css gyak/Zenek/Will Sparks - Ah Yeah So What (feat. Wiley & Elen Levon) (Bass Boosted).mp3"}
]

const audioplayer = document.querySelector("audio");
audioplayer.volume = 0.5;
const playBTN = document.getElementById("musicnavbar").childNodes[3];
const title = document.getElementById("musictitle");
const artist = document.getElementById("musicartist");
var songId = 0;
document.getElementById("musicnavbar").childNodes[1].addEventListener("click", function backJump() {
        songId--;
        if (songId < 0) {
            songId = abs(4 - abs(songId)); 
        }
        audioplayer.src = musics[songId % musics.length].src;
        title.innerHTML = musics[songId % musics.length].title;
        artist.innerHTML = musics[songId % musics.length].artist;
        if (playBTN.classList[1] == "fa-play") {
            audioplayer.play();
        }
        slide(title)
    }    
)

playBTN.addEventListener("click", function StopStart() {
        if (this.classList[1] == "fa-play") {
            this.classList.replace("fa-play", "fa-pause");
            audioplayer.pause()
        } else {
            this.classList.replace("fa-pause", "fa-play");
            audioplayer.play();
        }
    }    
)

document.getElementById("musicnavbar").childNodes[5].addEventListener("click", function fdJump() {
        songId++;
        audioplayer.src = musics[songId % musics.length].src;
        title.innerHTML = musics[songId % musics.length].title;
        artist.innerHTML = musics[songId % musics.length].artist;
        if (playBTN.classList[1] == "fa-play") {
            audioplayer.play();
        }
        slide(title);
    }    
)

function slide(obj) {
    if (obj.offsetWidth >= 250) {
        obj.style.animationName = "movetitle";
    } else {
        obj.style.animationName = "none";
    }
}
const volumeSlider = document.getElementById("volume");
volumeSlider.addEventListener("mouseup", function updateVolume() {
    audioplayer.volume = volumeSlider.value;
    if (volumeSlider.value == 0) {
        document.getElementById("volumeicon").className = "fa-solid fa-volume-xmark";
    } else if (volumeSlider.value < 0.5){
        document.getElementById("volumeicon").className = "fa-solid fa-volume-low";
    } else {
        document.getElementById("volumeicon").className = "fa-solid fa-volume-high";
    }   
    }   
);


function abs(be) {
    if (be < 0) {
        return be * (-1)
    }
    return be
}