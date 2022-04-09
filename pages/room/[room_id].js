import { useEffect, useState } from "react";
import { io } from 'socket.io-client'
import { useDisconnectSocketOnLeave } from "../../components/disconnectSocketOnLeave";
import styles from "../../styles/arrows.module.css"
import { getCookie, setCookies } from "cookies-next";
import { Title, Button, Flex, TextInput } from "../../styles/styled-components";
import { Container, Row, Col } from "styled-bootstrap-grid";
import Leaderboard from "../../components/Leaderboard";
import CanvasUtils from "../../utils/CanvasUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'

export default function Room({ room_id }) {
    const [playerInGame, setPlayerInGame] = useState(false);
    const [players, setPlayers] = useState([]);
    const [socket, setSocket] = useState(null);

    useDisconnectSocketOnLeave(socket);
    useEffect(() => {
        //setSocket(io("http://localhost:8080/rooms"));
        setSocket(io("https://snakeish-backend.herokuapp.com/rooms"));
    }, [])
    useEffect(() => {
        if (!socket) return;
        socket.emit('join-room', room_id,);

        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        window.onresize = () => {
            let canvasCol = document.getElementById("canvasCol");
            if (!canvasCol) return;
            let width = 600
            if (canvasCol.clientWidth - 50 < width) width = canvasCol.clientWidth - 50;
            canvas.width = width;
            canvas.height = width;
        }
        socket.on("game-update", (data) => {
            const { players, apple, GRID_SIZE } = data;
            const CELL_SIZE = canvas.width / GRID_SIZE;
            setPlayers(players);
            CanvasUtils.ClearCanvas(canvas);
            CanvasUtils.DrawGridOutline(canvas, GRID_SIZE, CELL_SIZE);
            CanvasUtils.DrawSnakes(ctx, CELL_SIZE, players);
            CanvasUtils.DrawApple(ctx, CELL_SIZE, apple);
        })
        const handleKeyDown = (e) => {
            const key = e.key;
            if (key == "ArrowUp" || key == "w") SendTargetDirection("up");
            else if (key == "ArrowDown" || key == "s") SendTargetDirection("down");
            else if (key == "ArrowLeft" || key == "a") SendTargetDirection("left");
            else if (key == "ArrowRight" || key == "d") SendTargetDirection("right");
        }
        document.removeEventListener("keydown", handleKeyDown);
        document.addEventListener("keydown", handleKeyDown)
        function SendTargetDirection(targetDirection) {
            socket.emit('update-target-direction', targetDirection);
        }
        return () => {
            socket.disconnect();
        }
    }, [socket])

    const joinGame = () => {
        const name = document.getElementById("name-input").value;
        setCookies("player_name", name, {
            maxAge: 604800,
        });
        socket.emit("join-game", name)
        setPlayerInGame(true);
    }
    const leaveGame = () => {
        socket.emit("leave-game");
        setPlayerInGame(false);
    }

    return (<>
        <Flex justifyContent="center">
            <div style={{ marginRight: "auto" }}>
                <Link href="/" passHref>
                    <Button padding="0.5em 1em" margin="0.5em 1em">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                </Link>
            </div>
            <div style={{ marginRight: "auto" }}><Title center>Room: {room_id}</Title></div>
        </Flex>
        <Container>
            <Row style={{ borderRadius: "1em", overflow: "hidden" }}>
                <Col lg={8} style={{ backgroundColor: "#4A525A", padding: "1em" }} id="canvasCol">
                    <Flex justifyContent="center" alignCenter style={{ margin: "0.5em" }}>
                        <canvas id="canvas" width={600} height={600} />
                    </Flex>
                </Col>
                <Col lg={4} style={{ backgroundColor: "#D62246", padding: "0em 0.5em", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    {playerInGame ?
                        <>
                            <div style={{ marginBottom: "auto" }}>
                                <Leaderboard players={players} />
                            </div>
                            <div style={{ marginTop: "auto" }}>
                                <Button bold margin="1.4em" onClick={leaveGame}>Leave game</Button>
                            </div>
                        </>
                        : <>
                            <Flex alignCenter justifyContent="center" column>
                                <TextInput>
                                    <input type="text" required id="name-input" defaultValue={getCookie("player_name") != null ? getCookie("player_name") : ""} />
                                    <label>Nickname</label>
                                </TextInput>
                                <Button onClick={joinGame}>Join game</Button>
                            </Flex>
                        </>
                    }
                </Col>
            </Row>
        </Container>
        <div id="touch-controls">
            <button id="move-up" className={styles.moveUp + " " + styles.arrow} style={{ display: "none" }}>Up</button>
            <button id="move-down" className={styles.moveDown + " " + styles.arrow} style={{ display: "none" }}>Down</button>
            <button id="move-left" className={styles.moveLeft + " " + styles.arrow} style={{ display: "none" }}>Left</button>
            <button id="move-right" className={styles.moveRight + " " + styles.arrow} style={{ display: "none" }}>Right</button>
        </div>
    </>)
}

export async function getServerSideProps(context) {
    const room_id = context.query.room_id;
    const doesExist = await fetch("http://snakeish-backend.herokuapp.com/api/room-exists", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ room_ID: room_id })
    })
    const { exists, error } = await doesExist.json();
    if (!exists || error != null) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    return {
        props: {
            room_id: room_id
        }
    }
}