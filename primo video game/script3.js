const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const c = 20;
const g = canvas.width / c;

let snake = [
    { x: 10, y: 10 }
];

let dx = 1;
let dy = 0;

let food = randomCibo();

// Caricamento sprite
const sprite = {
    testaUp: new Image(),
    testaDown: new Image(),
    testaLeft: new Image(),
    testaRight: new Image(),
    corpo: new Image(),
    coda: new Image(),
    mela: new Image()
};

sprite.testaUp.src = "img/testa_up.png";
sprite.testaDown.src = "img/testa_down.png";
sprite.testaLeft.src = "img/testa_left.png";
sprite.testaRight.src = "img/testa_right.png";
sprite.corpo.src = "img/corpo.png";
sprite.coda.src = "img/coda.png";
sprite.mela.src = "img/mela.png";

function randomCibo() {
    return {
        x: Math.floor(Math.random() * g),
        y: Math.floor(Math.random() * g)
    };
}

function draw() {
    let nextX = snake[0].x + dx;
    let nextY = snake[0].y + dy;

    if (nextX < 0 || nextY < 0 || nextX >= g || nextY >= g || collision(nextX, nextY)) {
        alert("Game Over!");
        snake = [{ x: 10, y: 10 }];
        dx = 1; dy = 0;
        food = randomCibo();
        return;
    }

    const head = { x: nextX, y: nextY };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = randomCibo();
    } else {
        snake.pop();
    }

    // Sfondo
    ctx.fillStyle = "#f1f1f1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cibo
    ctx.drawImage(sprite.mela, food.x * c, food.y * c, c, c);

    // Serpente
    for (let i = 0; i < snake.length; i++) {
        const part = snake[i];

        if (i === 0) {
            // Testa in base alla direzione
            let headImg = sprite.testaRight;
            if (dx === 1) headImg = sprite.testaRight;
            else if (dx === -1) headImg = sprite.testaLeft;
            else if (dy === -1) headImg = sprite.testaUp;
            else if (dy === 1) headImg = sprite.testaDown;
            ctx.drawImage(headImg, part.x * c, part.y * c, c, c);
        } else if (i === snake.length - 1) {
            ctx.drawImage(sprite.coda, part.x * c, part.y * c, c, c);
        } else {
            ctx.drawImage(sprite.corpo, part.x * c, part.y * c, c, c);
        }
    }

    punteggio();
}

function collision(x, y) {
    return snake.some(part => part.x === x && part.y === y);
}

function changeDirection(newDx, newDy) {
    if (dx !== -newDx || dy !== -newDy) {
        dx = newDx;
        dy = newDy;
    }
}

function punteggio() {
    let punti = document.getElementById("punteggio");
    punti.innerHTML = snake.length;
}

// Bottoni direzionali
document.getElementById("moveup").addEventListener("click", () => changeDirection(0, -1));
document.getElementById("movedown").addEventListener("click", () => changeDirection(0, 1));
document.getElementById("moveleft").addEventListener("click", () => changeDirection(-1, 0));
document.getElementById("moveright").addEventListener("click", () => changeDirection(1, 0));

// Tastiera
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") changeDirection(0, -1);
    if (e.key === "ArrowDown") changeDirection(0, 1);
    if (e.key === "ArrowLeft") changeDirection(-1, 0);
    if (e.key === "ArrowRight") changeDirection(1, 0);
});

setInterval(draw, 500);
