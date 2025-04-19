const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const c = 20; // dimensione cella
const g = canvas.width / c; // griglia

let snake = [
    { x: 10, y: 10 }
];

let dx = 1;
let dy = 0;

let food = randomCibo();

function randomCibo() {
    return {
        x: Math.floor(Math.random() * g),
        y: Math.floor(Math.random() * g)
    };
}

function draw() {
    // Calcolo nuova testa
    let nextX = snake[0].x + dx;
    let nextY = snake[0].y + dy;

    // Controllo collisioni
    if (nextX < 0 || nextY < 0 || nextX >= g || nextY >= g || collision(nextX, nextY)) {
        alert("Game Over!");
        snake = [{ x: 10, y: 10 }];
        dx = 1; dy = 0;
        food = randomCibo();
        return;
    }

    const head = { x: nextX, y: nextY };
    snake.unshift(head);

    // Se prende il cibo
    if (head.x === food.x && head.y === food.y) {
        food = randomCibo();
    } else {
        snake.pop();
    }

    // Sfondo
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cibo
    ctx.fillStyle = "lime";
    ctx.fillRect(food.x * c, food.y * c, c, c);

    // Serpente
    ctx.fillStyle = "red";
    for (let part of snake) {
        ctx.fillRect(part.x * c, part.y * c, c - 1, c - 1);
    }

    punteggio();
}

function collision(x, y) {
    return snake.some(part => part.x === x && part.y === y);
}

function changeDirection(newDx, newDy) {
    // Impedisce il movimento opposto (es: destra + sinistra)
    if (dx !== -newDx || dy !== -newDy) {
        dx = newDx;
        dy = newDy;
    }
}


function punteggio(){
    let punti = document.getElementById("punteggio");
    punti.innerHTML = snake.length;
}

// Bottoni direzionali
document.getElementById("moveup").addEventListener("click", () => changeDirection(0, -1));
document.getElementById("movedown").addEventListener("click", () => changeDirection(0, 1));
document.getElementById("moveleft").addEventListener("click", () => changeDirection(-1, 0));
document.getElementById("moveright").addEventListener("click", () => changeDirection(1, 0));

// Tastiera (freccette)
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") changeDirection(0, -1);
    if (e.key === "ArrowDown") changeDirection(0, 1);
    if (e.key === "ArrowLeft") changeDirection(-1, 0);
    if (e.key === "ArrowRight") changeDirection(1, 0);
});

setInterval(draw, 500);
