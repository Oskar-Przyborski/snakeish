import { useEffect, useState } from "react";
import { io } from 'socket.io-client'
import { useDisconnectSocketOnLeave } from "../../components/disconnectSocketOnLeave";
import styles from "../../styles/arrows.module.css"
import { getCookie } from "cookies-next";
export default function Room({ room_id }) {
    let [socket, setSocket] = useState(null);
    let [playerScore, setPlayerScore] = useState(0);
    let [otherPlayers, setOtherPlayers] = useState([]);
    useDisconnectSocketOnLeave(socket, true);

    useEffect(() => {
        
        setSocket(io("https://snakeish-backend.herokuapp.com/rooms"));
        //setSocket(io("http://localhost:8080/rooms"));
    }, [])
    useEffect(() => {
        const player_name = getCookie("player_name");
        if (!socket) return;

        socket.removeAllListeners();
        socket.on("connect", () => {
            socket.removeAllListeners()
            socket.emit('join-room', room_id, player_name);

            const GRID_SIZE = 16;
            const CELL_SIZE = 30;

            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");

            let direction = "right";
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
            socket.on("game-update", (data) => {
                snake = data.snake;
                otherPlayers = data.otherPlayers;
                setOtherPlayers(otherPlayers);
                apple = data.apple;
                score = data.score;
                setPlayerScore(score);
                direction = data.direction;
                ClearCanvas()
                DrawGridOutline();
                DrawOtherSnakes();
                DrawSnake();
                DrawApple();
            })

            function SendTargetDirection(targetDirection) {
                socket.emit('update-target-direction', targetDirection);
            }

            //add keyboard input 
            document.addEventListener("keydown", (e) => {
                const key = e.key;
                if ((key == "ArrowUp" || key == "w") && direction != "down") {
                    SendTargetDirection("up");
                } else if ((key == "ArrowDown" || key == "s") && direction != "up") {
                    SendTargetDirection("down");
                } else if ((key == "ArrowLeft" || key == "a") && direction != "right") {
                    SendTargetDirection("left");
                } else if ((key == "ArrowRight" || key == "d") && direction != "left") {
                    SendTargetDirection("right");
                }
            });
            //if mobile - show touch controls
            function isMobile() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            }
            if (isMobile()) {
                document.getElementById("move-up").style.display = "block";
                document.getElementById("move-up").addEventListener("click", () => { direction != "down" && SendTargetDirection("up") });
                document.getElementById("move-down").style.display = "block";
                document.getElementById("move-down").addEventListener("click", () => { direction != "up" && SendTargetDirection("down") });
                document.getElementById("move-left").style.display = "block";
                document.getElementById("move-left").addEventListener("click", () => { direction != "right" && SendTargetDirection("left") });
                document.getElementById("move-right").style.display = "block";
                document.getElementById("move-right").addEventListener("click", () => { direction != "left" && SendTargetDirection("right") });
            }
            return () => {
                socket.disconnect();
                socket.close();
            }
        })
    }, [socket])
    return (<>
        <h1 className="text-center text-2xl my-3">Snakeish</h1>
        <div className="grid place-content-center lg:grid-cols-2 grid-cols-1 gap-y-5">
            <div className="flex justify-center align-center">
                <canvas id="canvas" width={480} height={480}></canvas>
            </div>
            <div className="scores flex justify-center items-start">
                <table className="table-auto border-collapse text-lg">
                    <thead>
                        <tr>
                            <th className="font-semibold pb-2">
                                Name
                            </th>
                            <th className="font-semibold pb-2">
                                Score
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {
                            otherPlayers.sort((a, b) => a.score < b.score).map((player, index) => {
                                return (<tr key={index} >
                                    <td className="p-3">{player.name}</td>
                                    <td>{player.score}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <div id="touch-controls">
            <button id="move-up" className={styles.moveUp + " " + styles.arrow} style={{ display: "none" }}>Up</button>
            <button id="move-down" className={styles.moveDown + " " + styles.arrow} style={{ display: "none" }}>Down</button>
            <button id="move-left" className={styles.moveLeft + " " + styles.arrow} style={{ display: "none" }}>Left</button>
            <button id="move-right" className={styles.moveRight + " " + styles.arrow} style={{ display: "none" }}>Right</button>
        </div>
    </>)
}

export function getServerSideProps(context) {
    return {
        props: {
            room_id: context.query.room_id
        }
    }
}