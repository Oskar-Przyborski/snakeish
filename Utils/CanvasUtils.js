const configData = { canvas: null }
function Config(canvas) {
    configData.canvas = canvas;
    configData.ctx = canvas.getContext("2d");
}
function DrawGridOutline(GRID_SIZE, CELL_SIZE) {
    for (let x = 0; x < GRID_SIZE + 1; x++) {
        configData.ctx.moveTo(x * CELL_SIZE, 0);
        configData.ctx.lineTo(x * CELL_SIZE, configData.canvas.height);
    }
    for (let y = 0; y < GRID_SIZE + 1; y++) {
        configData.ctx.moveTo(0, y * CELL_SIZE);
        configData.ctx.lineTo(configData.canvas.width, y * CELL_SIZE);
    }
    configData.ctx.strokeStyle = "black";
    configData.ctx.stroke();
}
function FillCell(CELL_SIZE, x, y, color) {
    configData.ctx.fillStyle = color;
    configData.ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

const ClearCanvas = () => configData.ctx.clearRect(0, 0, configData.canvas.width, configData.canvas.height);

function DrawSnakes(CELL_SIZE, players) {
    if (players.length == 0) return;

    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        DrawPlayerSnake(CELL_SIZE, player);
    }
}
function DrawPlayerSnake(CELL_SIZE, player) {
    const snake = player.gameData.snake;
    const name = player.gameData.name;
    const color = player.gameData.color;
    for (let i = 0; i < snake.length; i++) {
        const { x, y } = snake[i];
        FillCell(CELL_SIZE, x, y, color);
    }
    DrawText(name, snake[0].x, snake[0].y, CELL_SIZE);
}
function DrawText(text, xCell, yCell, CELL_SIZE) {
    configData.ctx.fillStyle = "white";
    configData.ctx.font = CELL_SIZE / 1.8 + "px Arial";
    configData.ctx.textAlign = "center";
    //fill text centered vertically and horizontally
    const x = xCell * CELL_SIZE + (CELL_SIZE / 2);
    const y = yCell * CELL_SIZE + (CELL_SIZE / 2) + (CELL_SIZE / 6);
    configData.ctx.fillText(text, x, y);
}
function DrawApple(CELL_SIZE, apple) {
    FillCell(CELL_SIZE, apple.x, apple.y, "red");
}

// //if mobile - show touch controls
// function isMobile() {
//     return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
// }
// if (isMobile()) {
//     document.getElementById("move-up").style.display = "block";
//     document.getElementById("move-up").addEventListener("click", () => { direction != "down" && SendTargetDirection("up") });
//     document.getElementById("move-down").style.display = "block";
//     document.getElementById("move-down").addEventListener("click", () => { direction != "up" && SendTargetDirection("down") });
//     document.getElementById("move-left").style.display = "block";
//     document.getElementById("move-left").addEventListener("click", () => { direction != "right" && SendTargetDirection("left") });
//     document.getElementById("move-right").style.display = "block";
//     document.getElementById("move-right").addEventListener("click", () => { direction != "left" && SendTargetDirection("right") });
// }


export default {
    Config,
    DrawGridOutline,
    FillCell,
    ClearCanvas,
    DrawSnakes,
    DrawApple,
}