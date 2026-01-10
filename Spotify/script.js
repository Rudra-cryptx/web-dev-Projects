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

async function main() {

    let songs = await getSongs();


    let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0]

    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li>
        <div class="info">
        <img class=" invert" src="music.svg" alt="">
        ${song.replaceAll("%5C", " ").replaceAll("%20", " ").replaceAll(".mp3", "")}    </div>
        <div class="playnow">
            <img class="invert" src="plays.svg" alt="">
            <span>Play  Now</span>
             </div>
        </li>`;
    }

    // var audio = new Audio(songs[0]);
    // audio.play();

}

main();