async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/Songs/")
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];

        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(/Songs/)[1])
        }
    }
    return songs;
}

const playmusic = (track)=>{
    let audio = new Audio("/Songs/" + track +".mp3");
    audio.play()
}

async function main() {

    let currentSong;

    let songs = await getSongs();


    let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0]

    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li>
        <div class="info">
        <img class=" invert" src="music.svg" alt="">
        <span class="s_name">${song.replaceAll("%5C", " ").replaceAll("%20", " ").replaceAll(".mp3", "")} </span>   </div>
        <div class="playnow">
            <img class="invert" src="plays.svg" alt="">
            <span>Play  Now</span>
            </div>
        </li>`;
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".s_name ").innerHTML);
            playmusic(e.querySelector(".s_name ").innerHTML.trim());
        })
    })

}

main();