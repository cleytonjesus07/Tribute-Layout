

let playerVideo = document.getElementById("tv");
let img = document.getElementById("img");
let end = false;
const arrSpan = document.querySelectorAll("span");
let replay;
const fixedPath = "./assets/";
let widthBody = document.getElementsByTagName("body")[0].clientWidth;
let arrPhotos = [{
    nome:"Oscar",
    picPath:`${fixedPath}images/heathLedger.jpg`,
    videoPath:`${fixedPath}media/oscar.mp4`
},
{
    nome: "The Patriot",
    picPath: `${fixedPath}images/thePatriot.jfif`,
    videoPath:`${fixedPath}media/thePatriot.mp4`
},
{
    nome: "10 Things I Hate About You",
    picPath: `${fixedPath}images/patrickVerona.jpg`,
    videoPath:`${fixedPath}media/tenThings.mp4`
},
{
    nome: "Monster's Ball",
    picPath: `${fixedPath}images/monsterBall.jpg`,
    videoPath:`${fixedPath}media/monsterBall.mp4`
},
{
    nome: "A Knight's Tale",
    picPath: `${fixedPath}images/knightsTale.jpg`,
    videoPath:`${fixedPath}media/knightsTale.mp4`
},
{
    nome: "The Dark Knight",
    picPath: `${fixedPath}images/joker.jpg`,
    videoPath:`${fixedPath}media/theDarkKnight.mp4`
}
]
let count = 0;
let play = false;

window.onload = () => {
    document.getElementsByTagName("h1")[0].addEventListener("mouseover",()=>img.src=arrPhotos[0].picPath)
    arrSpan.forEach((span) => {
        span.title = "Clique para assistir a um vídeo."
        span.addEventListener("click", () => {
            if(playerVideo.currentTime == 0 && play == false){  
                if(widthBody < 870) {
                    document.getElementsByClassName("container_content")[0].style.opacity=0
                }
                play = true;
                ColocarEremoverImagem(play)
            } 
        });
        span.addEventListener("mouseover",()=>alternarImgs(span.textContent))
    })
}

function alternarImgs(filme){
    if(play == false){
        arrPhotos.forEach((obj)=>{
            
            if(obj.nome.indexOf(filme) >= 0){
                playerVideo.src = obj.videoPath;
                img.src = obj.picPath;
            } 
        })
    }
}





function ColocarEremoverImagem(opacity) {
    if (opacity) {
        img.style.opacity = 0
        montarVideo()
    } else {
        img.style.opacity = 1;
        return;
    }
}

function montarVideo() {
    if (playerVideo.currentTime == 0) {
        if(widthBody < 870){
            document.body.style.overflow = "hidden"
            document.getElementsByTagName("h1")[0].style.display="none";
            window.location.href = "#tv";
        };
        playerVideo.style.opacity = 1;
        playerVideo.controls = true;
        playerVideo.play();
        verificarVideo();
    }
}

function verificarVideo() {
    if (playerVideo.currentTime == playerVideo.duration) {
        playerVideo.style.opacity = 0;
        playerVideo.pause();
        playerVideo.currentTime = 0
        play = false;
        ColocarEremoverImagem(false);
        document.getElementsByTagName("h1")[0].style.display="flex";
        console.log("Acabou");
        clearTimeout(replay);
        if(document.getElementsByTagName("body")[0].clientWidth < 600) {
            document.getElementsByClassName("container_content")[0].style.opacity=1
        }
        return;
    }
    console.log("Executando...")
    replay = setTimeout(verificarVideo, 500);
}

