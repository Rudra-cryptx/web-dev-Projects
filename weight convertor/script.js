let a = document.getElementById("input").value;


document.querySelector(".button").addEventListener("click", ()=>{
    let a = Number(document.getElementById("input").value);
    console.log(a);
    let b = Math.round(a*2.2 );
    document.querySelector(".ans").innerHTML = b;
})