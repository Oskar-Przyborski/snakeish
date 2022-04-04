import { useEffect} from "react";
import { io } from 'socket.io-client'
export default function Room({ room_id }) {
    useEffect(() => {
        const socket = io("https://snakeish-backend.herokuapp.com/rooms");
        //const socket = io("http://localhost:8080/rooms");
        socket.on("connect", () => {
            socket.removeAllListeners()
            socket.emit('join-room', room_id);

            const GRID_SIZE = 16;
            const CELL_SIZE = 30;

            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");

            class Vector2 {
                x;
                y;
                constructor(x, y) {
                    this.x = x;
                    this.y = y;
                }
            }
            let direction = new Vector2(1, 0);
            let snake = [];
            let otherPlayers = [];
            let apple;
            let score = 0;
            function DrawGridOutline() {
                for (let x = 0; x < GRID_SIZE; x++) {
                    for (let y = 0; y < GRID_SIZE; y++) {
                        ctx.strokeStyle = "black";
                        ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    }
                }
            }
            function FillCell(x, y, color) {
                ctx.fillStyle = color;
                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
            function ClearCanvas() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            function DrawSnake() {
                for (let i = 0; i < snake.length; i++) {
                    if (i == 0) {
                        FillCell(snake[i].x, snake[i].y, "darkgreen");
                    } else {
                        FillCell(snake[i].x, snake[i].y, "green");
                    }
                }
            }
            function DrawOtherSnakes() {
                for (let i = 0; i < otherPlayers.length; i++) {
                    const player = otherPlayers[i];
                    for (let j = 0; j < player.snake.length; j++) {
                        if (j == 0) {
                            FillCell(player.snake[j].x, player.snake[j].y, "darkblue");
                        } else {
                            FillCell(player.snake[j].x, player.snake[j].y, "blue");
                        }
                    }
                }
            }
            function DrawApple() {
                FillCell(apple.x, apple.y, "red");
            }

            function UpdateScore() {
                document.getElementById("score").innerHTML = "Score: " + score;
            }
            socket.on("game-update", (data) => {
                snake = data.snake;
                otherPlayers = data.otherPlayers;
                apple = data.apple;
                score = data.score;
                direction = data.direction;
                ClearCanvas()
                DrawGridOutline();
                DrawOtherSnakes();
                DrawSnake();
                DrawApple();
                UpdateScore();
            })

            function SendTargetDirection(targetDirection) {
                socket.emit('update-target-direction', { x: targetDirection.x, y: targetDirection.y });
            }

            //add keyboard input 
            document.addEventListener("keydown", (e) => {
                const key = e.key;
                if ((key == "ArrowUp" || key == "w") && direction.y != 1) {
                    SendTargetDirection(new Vector2(0, -1));
                } else if ((key == "ArrowDown" || key == "s") && direction.y != -1) {
                    SendTargetDirection(new Vector2(0, 1));
                } else if ((key == "ArrowLeft" || key == "a") && direction.x != 1) {
                    SendTargetDirection(new Vector2(-1, 0));
                } else if ((key == "ArrowRight" || key == "d") && direction.x != -1) {
                    SendTargetDirection(new Vector2(1, 0));
                }
            });
        })
    }, [])

    return (<>
        <h1>Room {room_id}</h1>
        <canvas id="canvas" width={500} height={500}></canvas>
        <h2 id="score">Score: </h2>
    </>)
}

export function getServerSideProps(context) {
    return {
        props: {
            room_id: context.query.room_id
        }
    }
}