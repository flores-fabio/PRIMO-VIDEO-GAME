const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const c = 20;
const g = canvas.width/c;

let snake= [{
    x: 10, 
    y: 10
}]

let dx = 1;
let dy = 0;

var food = randomCibo();

function randomCibo(){
    return {
        x: Math.floor(Math.random() * g), 
        y: Math.floor(Math.random() * g)
    }
}




function draw(){
    let nextX = snake[0].x + dx;
    let nextY = snake[0].y + dx;

    const head = {x: nextX, y: nextY};
    snake.unshift(head); //mette al primo posto dell'array

    if (head.x == food.x && head.y == food.y){
        food = randomCibo();
    }   else{
        snake.pop();
    }
    ctx.fillstyle ="#222"
    ctx.fillRect(0,0,canvas.width, canvas.height);

    //cibo
    ctx.fillstyle = "lime";
    ctx.fillRect(food.x * c, food.y * c, c, c);

    //serpente
    ctx.fillstyle = "red"
    for (let part of snake){
        ctx.fillRect(part.x * c, part.y * c, c - 1, c -1 );
    }
}

function changeDirection(newDx, newDy){
    dx = newDx;
    dy = newDy;
}


setInterval(draw, 120);