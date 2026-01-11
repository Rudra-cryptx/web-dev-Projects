let currentSong = new Audio();

function sectomin(second){
    if(isNaN(second)|| second<0){
        return "Invalid input";
    }

    const minuites = Math.floor(second/60);
    const remainingsec = Math.floor(second%60);

    const formattedMinuites = String(minuites).padStart(2,'0');
    const formattedSecond = String(remainingsec).padStart(2,'0');

    return `${formattedMinuites}:${formattedSecond}`;

}

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

const playmusic = (track , pause = false)=>{
    
    currentSong.src = "/Songs/" + track +".mp3";
    currentSong.play()
    play.src = "pause.svg"
    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songtime").innerHTML = "00:00/00:00"
}

async function main() {

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


    play.addEventListener("click" , ()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "plays.svg"
        }
    })

    currentSong.addEventListener("timeupdate" , ()=>{
        console.log(currentSong.currentTime , currentSong.duration);
        document.querySelector(".songtime").innerHTML = `
        ${sectomin(currentSong.currentTime)}/${sectomin(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%";
    })

    document.querySelector(".seekbar").addEventListener("click" , e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration)* percent)/100
    })

    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "0";
    })
    document.querySelector(".close").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "-200%"
    })

}

main();