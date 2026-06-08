const game = document.querySelector(".game");
const car = document.querySelector(".car");
const scoreEl = document.getElementById("score");

let score = 0;
let speed = 5;

let keys = {
    ArrowLeft:false,
    ArrowRight:false,
    ArrowUp:false,
    ArrowDown:false
};

document.addEventListener("keydown", e=>{
    if(keys.hasOwnProperty(e.key)){
        keys[e.key]=true;
    }
});

document.addEventListener("keyup", e=>{
    if(keys.hasOwnProperty(e.key)){
        keys[e.key]=false;
    }
});

for(let i=0;i<6;i++){
    let line=document.createElement("div");
    line.classList.add("line");
    line.style.top=(i*150)+"px";
    game.appendChild(line);
}

for(let i=0;i<3;i++){
    let enemy=document.createElement("div");
    enemy.classList.add("enemy");
    enemy.style.left=Math.floor(Math.random()*350)+"px";
    enemy.style.top=(-(i+1)*300)+"px";
    game.appendChild(enemy);
}

let player={
    x:175,
    y:window.innerHeight-120
};

function moveLines(){
    document.querySelectorAll(".line").forEach(line=>{
        let top=parseInt(line.style.top);
        top+=speed;

        if(top>window.innerHeight){
            top=-100;
        }

        line.style.top=top+"px";
    });
}

function moveEnemies(){
    document.querySelectorAll(".enemy").forEach(enemy=>{
        let top=parseInt(enemy.style.top);
        top+=speed;

        if(top>window.innerHeight){
            top=-200;
            enemy.style.left=Math.floor(Math.random()*350)+"px";
            score++;
            scoreEl.innerText=score;

            if(score%10===0){
                speed++;
            }
        }

        enemy.style.top=top+"px";

        let enemyRect=enemy.getBoundingClientRect();
        let carRect=car.getBoundingClientRect();

        if(
            enemyRect.left < carRect.right &&
            enemyRect.right > carRect.left &&
            enemyRect.top < carRect.bottom &&
            enemyRect.bottom > carRect.top
        ){
            alert("Game Over! Score: "+score);
            location.reload();
        }
    });
}

function gamePlay(){

    if(keys.ArrowLeft && player.x>0){
        player.x-=7;
    }

    if(keys.ArrowRight && player.x<350){
        player.x+=7;
    }

    car.style.left=player.x+"px";

    moveLines();
    moveEnemies();

    requestAnimationFrame(gamePlay);
}

gamePlay();const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const restartBtn = document.getElementById("restartBtn");

leftBtn.addEventListener("touchstart", () => {
    keys.ArrowLeft = true;
});

leftBtn.addEventListener("touchend", () => {
    keys.ArrowLeft = false;
});

rightBtn.addEventListener("touchstart", () => {
    keys.ArrowRight = true;
});

rightBtn.addEventListener("touchend", () => {
    keys.ArrowRight = false;
});

restartBtn.addEventListener("click", () => {
    location.reload();
});