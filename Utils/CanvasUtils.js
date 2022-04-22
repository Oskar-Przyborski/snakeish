const configData = { canvas: null }
function Config(canvas) {
    let DmSansFont = new FontFace(
        "DM Sans",
        "url(https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap)"
    );
    document.fonts.add(DmSansFont)
    configData.canvas = canvas;
    configData.ctx = canvas.getContext("2d");
}
function DrawGridOutline(GRID_SIZE, CELL_SIZE) {
    configData.ctx.beginPath();
    for (let x = 0; x < GRID_SIZE + 1; x++) {
        configData.ctx.moveTo(x * CELL_SIZE, 0);
        configData.ctx.lineTo(x * CELL_SIZE, configData.canvas.height);
    }
    for (let y = 0; y < GRID_SIZE + 1; y++) {
        configData.ctx.moveTo(0, y * CELL_SIZE);
        configData.ctx.lineTo(configData.canvas.width, y * CELL_SIZE);
    }
    configData.ctx.strokeStyle = "rgba(0,0,0,1)";
    configData.ctx.stroke();
    configData.ctx.closePath();
}

const ClearCanvas = () => {
    configData.ctx.clearRect(0, 0, configData.canvas.width, configData.canvas.height);
}

function DrawSnakes(CELL_SIZE, players) {
    if (players.length == 0) return;

    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        DrawPlayerSnake(CELL_SIZE, player);
    }
}
function DrawPlayerSnake(CELL_SIZE, player) {
    const snake = player.gameData.snake;
    if (snake.length == 0) return;
    const name = player.gameData.name;
    const color = player.gameData.color;
    for (let i = 0; i < snake.length; i++) {
        const currentElement = snake[i];
        const previousElement = i < snake.length - 1 ? snake[i + 1] : null;
        const nextElement = i > 0 ? snake[i - 1] : null;
        DrawSnakeElement(CELL_SIZE, previousElement, currentElement, nextElement, color);
    }
    DrawText(name, snake[0].x, snake[0].y, CELL_SIZE);
}
function DrawSnakeElement(CELL_SIZE, previousElement, currentElement, nextElement, color) {
    const prevDiff = previousElement != null ? { x: previousElement.x - currentElement.x, y: previousElement.y - currentElement.y } : null;
    const nextDiff = nextElement != null ? { x: nextElement.x - currentElement.x, y: nextElement.y - currentElement.y } : null;
    const currentElementTopLeftPos = { x: currentElement.x * CELL_SIZE, y: currentElement.y * CELL_SIZE };
    switch (JSON.stringify({ prev: prevDiff, next: nextDiff })) {
        case JSON.stringify({ prev: { x: -1, y: 0 }, next: { x: 1, y: 0 } }):
        case JSON.stringify({ prev: { x: 1, y: 0 }, next: { x: -1, y: 0 } }):
            DrawRectShape(currentElementTopLeftPos.x, currentElementTopLeftPos.y + CELL_SIZE * 0.125, CELL_SIZE, CELL_SIZE * 0.75, color);
            break;
        case JSON.stringify({ prev: { x: 0, y: 1 }, next: { x: 0, y: -1 } }):
        case JSON.stringify({ prev: { x: 0, y: -1 }, next: { x: 0, y: 1 } }):
            DrawRectShape(currentElementTopLeftPos.x + CELL_SIZE * 0.125, currentElementTopLeftPos.y, CELL_SIZE * 0.75, CELL_SIZE, color);
            break;
        case JSON.stringify({ prev: { x: 0, y: 1 }, next: { x: 1, y: 0 } }):
        case JSON.stringify({ prev: { x: 1, y: 0 }, next: { x: 0, y: 1 } }):
            DrawRectShape(currentElementTopLeftPos.x + CELL_SIZE * 0.125, currentElementTopLeftPos.y + CELL_SIZE * 0.125, CELL_SIZE * 0.75, CELL_SIZE * 0.875, color);
            DrawRectShape(currentElementTopLeftPos.x + CELL_SIZE * 0.125, currentElementTopLeftPos.y + CELL_SIZE * 0.125, CELL_SIZE * 0.875, CELL_SIZE * 0.75, color);
            break;
        case JSON.stringify({ prev: { x: -1, y: 0 }, next: { x: 0, y: 1 } }):
        case JSON.stringify({ prev: { x: 0, y: 1 }, next: { x: -1, y: 0 } }):
            DrawRectShape(currentElementTopLeftPos.x + CELL_SIZE * 0.125, currentElementTopLeftPos.y + CELL_SIZE * 0.125, CELL_SIZE * 0.75, CELL_SIZE * 0.875, color);
            DrawRectShape(currentElementTopLeftPos.x, currentElementTopLeftPos.y + CELL_SIZE * 0.125, CELL_SIZE * 0.875, CELL_SIZE * 0.75, color);
            break;
        case JSON.stringify({ prev: { x: 0, y: -1 }, next: { x: 1, y: 0 } }):
        case JSON.stringify({ prev: { x: 1, y: 0 }, next: { x: 0, y: -1 } }):
            DrawRectShape(currentElementTopLeftPos.x + CELL_SIZE * 0.125, currentElementTopLeftPos.y, CELL_SIZE * 0.75, CELL_SIZE * 0.875, color);
            DrawRectShape(currentElementTopLeftPos.x + CELL_SIZE * 0.125, currentElementTopLeftPos.y + CELL_SIZE * 0.125, CELL_SIZE * 0.875, CELL_SIZE * 0.75, color);
            break;
        case JSON.stringify({ prev: { x: 0, y: -1 }, next: { x: -1, y: 0 } }):
        case JSON.stringify({ prev: { x: -1, y: 0 }, next: { x: 0, y: -1 } }):
            DrawRectShape(currentElementTopLeftPos.x + CELL_SIZE * 0.125, currentElementTopLeftPos.y, CELL_SIZE * 0.75, CELL_SIZE * 0.875, color);
            DrawRectShape(currentElementTopLeftPos.x, currentElementTopLeftPos.y + CELL_SIZE * 0.125, CELL_SIZE * 0.875, CELL_SIZE * 0.75, color);
            break;
        case JSON.stringify({ prev: null, next: { x: 1, y: 0 } }):
        case JSON.stringify({ prev: { x: 0, y: 0 }, next: { x: 1, y: 0 } }):
        case JSON.stringify({ prev: { x: 1, y: 0 }, next: null }):
        case JSON.stringify({ prev: { x: 1, y: 0 }, next: { x: 0, y: 0 } }):
            DrawRectShape(currentElementTopLeftPos.x + CELL_SIZE * 0.125, currentElementTopLeftPos.y + CELL_SIZE * 0.125, CELL_SIZE * 0.875, CELL_SIZE * 0.75, color);
            break;
        case JSON.stringify({ prev: { x: -1, y: 0 }, next: null }):
        case JSON.stringify({ prev: { x: -1, y: 0 }, next: { x: 0, y: 0 } }):
        case JSON.stringify({ prev: null, next: { x: -1, y: 0 } }):
        case JSON.stringify({ prev: { x: 0, y: 0 }, next: { x: -1, y: 0 } }):
            DrawRectShape(currentElementTopLeftPos.x, currentElementTopLeftPos.y + CELL_SIZE * 0.125, CELL_SIZE * 0.875, CELL_SIZE * 0.75, color);
            break;
        case JSON.stringify({ prev: null, next: { x: 0, y: -1 } }):
        case JSON.stringify({ prev: { x: 0, y: 0 }, next: { x: 0, y: -1 } }):
        case JSON.stringify({ prev: { x: 0, y: -1 }, next: null }):
        case JSON.stringify({ prev: { x: 0, y: -1 }, next: { x: 0, y: 0 } }):
            DrawRectShape(currentElementTopLeftPos.x + CELL_SIZE * 0.125, currentElementTopLeftPos.y, CELL_SIZE * 0.75, CELL_SIZE * 0.875, color);
            break;
        case JSON.stringify({ prev: { x: 0, y: 1 }, next: null }):
        case JSON.stringify({ prev: { x: 0, y: 1 }, next: { x: 0, y: 0 } }):
        case JSON.stringify({ prev: null, next: { x: 0, y: 1 } }):
        case JSON.stringify({ prev: { x: 0, y: 0 }, next: { x: 0, y: 1 } }):
            DrawRectShape(currentElementTopLeftPos.x + CELL_SIZE * 0.125, currentElementTopLeftPos.y + CELL_SIZE * 0.125, CELL_SIZE * 0.75, CELL_SIZE * 0.875, color);
            break;
        case JSON.stringify({ prev: null, next: null }):
            DrawRectShape(currentElementTopLeftPos.x + CELL_SIZE * 0.125, currentElementTopLeftPos.y + CELL_SIZE * 0.125, CELL_SIZE * 0.75, CELL_SIZE * 0.75, color);
            break;
    }
}
function DrawRectShape(x, y, width, height, color) {
    configData.ctx.fillStyle = color;
    configData.ctx.fillRect(x, y, width, height);
}
function DrawText(text, xCell, yCell, CELL_SIZE) {
    configData.ctx.fillStyle = "white";
    configData.ctx.font = CELL_SIZE / 1.8 + "px DM Sans";
    configData.ctx.textAlign = "center";
    //fill text centered vertically and horizontally
    const x = xCell * CELL_SIZE + (CELL_SIZE / 2);
    const y = yCell * CELL_SIZE + (CELL_SIZE / 2) + (CELL_SIZE / 6);
    configData.ctx.fillText(text, x, y);
}
function DrawApples(CELL_SIZE, apples) {
    for (let i = 0; i < apples.length; i++) {
        DrawApple(CELL_SIZE, apples[i]);
    }
}
function DrawApple(CELL_SIZE, apple) {
    let color = "red"
    if (apple.value === 3) {
        color = "gold"
    }
    DrawRectShape((apple.x * CELL_SIZE) + (CELL_SIZE * 0.125), (apple.y * CELL_SIZE) + (CELL_SIZE * 0.125), CELL_SIZE * 0.75, CELL_SIZE * 0.75, color);
}

function DrawWaitingPlayers(waiting_players, min_players, countdown) {
    let waiting_players_text = "Waiting for players...";
    let players_count_text = `${waiting_players}/${min_players}`;
    let countdown_text = `Starting in ${countdown}s`;

    configData.ctx.fillStyle = "white";
    configData.ctx.font = "30px DM Sans";
    configData.ctx.textAlign = "center";
    //fill text centered vertically and horizontally
    const x = configData.canvas.width / 2;
    const y = configData.canvas.height / 2;
    configData.ctx.fillText(waiting_players_text, x, y - 50);
    configData.ctx.fillText(players_count_text, x, y);
    if (countdown > 0)
        configData.ctx.fillText(countdown_text, x, y + 50);
}
function DrawEndGame(winnerName, restartCountdown) {
    let winner_text = `${winnerName} won!`;
    let countdown_text = `Restarting in ${restartCountdown}s`;

    configData.ctx.fillStyle = "white";
    configData.ctx.font = "30px DM Sans";
    configData.ctx.textAlign = "center";
    //fill text centered vertically and horizontally
    const x = configData.canvas.width / 2;
    const y = configData.canvas.height / 2;
    configData.ctx.fillText(winner_text, x, y - 50);
    configData.ctx.fillText(countdown_text, x, y);
}
function DrawShrink(CELL_SIZE, GRID_SIZE, shrink_size) {
    configData.ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    //top 
    configData.ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, CELL_SIZE * shrink_size);
    //bottom
    configData.ctx.fillRect(0, GRID_SIZE * CELL_SIZE - CELL_SIZE * shrink_size, GRID_SIZE * CELL_SIZE, CELL_SIZE * shrink_size);
    //left
    configData.ctx.fillRect(0, shrink_size * CELL_SIZE, CELL_SIZE * shrink_size, (GRID_SIZE - shrink_size * 2) * CELL_SIZE);
    //right
    configData.ctx.fillRect(GRID_SIZE * CELL_SIZE - CELL_SIZE * shrink_size, shrink_size * CELL_SIZE, CELL_SIZE * shrink_size, (GRID_SIZE - shrink_size * 2) * CELL_SIZE);
}
function DrawFreezeTime(freezeTime) {
    configData.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    configData.ctx.font = "bold 72px DM Sans";
    configData.ctx.textAlign = "center";
    const x = configData.canvas.width / 2;
    const y = configData.canvas.height / 2;
    configData.ctx.fillText(freezeTime, x, y);
}
function DrawMapShrinkTime(shrinkTime) {
    configData.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    configData.ctx.textAlign = "center";
    const x = configData.canvas.width / 2;
    const y = configData.canvas.height / 2;
    configData.ctx.font = "24px DM Sans";
    configData.ctx.fillText("shrinking in", x, y - 32);
    configData.ctx.font = "64px DM Sans";
    configData.ctx.fillText(shrinkTime, x, y + 24);
}
function DrawKillShortestTime(killShortestTime) {
    configData.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    configData.ctx.textAlign = "center";
    const x = configData.canvas.width / 2;
    const y = configData.canvas.height / 2;
    configData.ctx.font = "24px DM Sans";
    configData.ctx.fillText("killing shortest snake in", x, y - 32);
    configData.ctx.font = "64px DM Sans";
    configData.ctx.fillText(killShortestTime, x, y + 24);
}


export default {
    Config,
    DrawGridOutline,
    ClearCanvas,
    DrawSnakes,
    DrawApples,
    DrawWaitingPlayers,
    DrawEndGame,
    DrawShrink,
    DrawFreezeTime,
    DrawMapShrinkTime,
    DrawKillShortestTime
}