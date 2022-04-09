function DrawGridOutline(canvas, GRID_SIZE, CELL_SIZE) {
    const ctx = canvas.getContext("2d");
    for (let x = 0; x < GRID_SIZE + 1; x++) {
        ctx.moveTo(x * CELL_SIZE, 0);
        ctx.lineTo(x * CELL_SIZE, canvas.height);
    }
    for (let y = 0; y < GRID_SIZE + 1; y++) {
        ctx.moveTo(0, y * CELL_SIZE);
        ctx.lineTo(canvas.width, y * CELL_SIZE);
    }
    ctx.strokeStyle = "black";
    ctx.stroke();
}
function FillCell(ctx, CELL_SIZE, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

const ClearCanvas = (canvas) => canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

function DrawSnakes(ctx, CELL_SIZE, players) {
    if (players.length == 0) return;
    
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        DrawSnake(ctx, CELL_SIZE, player.gameData.snake);
    }
}
function DrawSnake(ctx, CELL_SIZE, snake) {
    for (let i = 0; i < snake.length; i++) {
        const { x, y } = snake[i];
        FillCell(ctx, CELL_SIZE, x, y, "green");
    }
}
function DrawApple(ctx, CELL_SIZE, apple) {
    FillCell(ctx, CELL_SIZE, apple.x, apple.y, "red");
}

function SendTargetDirection(targetDirection) {
    socket.emit('update-target-direction', targetDirection);
}

// //add keyboard input 
// document.addEventListener("keydown", (e) => {
//     const key = e.key;
//     if ((key == "ArrowUp" || key == "w") && direction != "down") {
//         SendTargetDirection("up");
//     } else if ((key == "ArrowDown" || key == "s") && direction != "up") {
//         SendTargetDirection("down");
//     } else if ((key == "ArrowLeft" || key == "a") && direction != "right") {
//         SendTargetDirection("left");
//     } else if ((key == "ArrowRight" || key == "d") && direction != "left") {
//         SendTargetDirection("right");
//     }
// });
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
    DrawGridOutline,
    FillCell,
    ClearCanvas,
    DrawSnakes,
    DrawApple,
    SendTargetDirection,
}