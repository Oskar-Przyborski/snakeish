import { useEffect, useState } from "react";
import { io } from 'socket.io-client'
import { useDisconnectSocketOnLeave } from "../../components/disconnectSocketOnLeave";
import styles from "../../styles/arrows.module.css"
import { getCookie, setCookies } from "cookies-next";
import { Title, Button, Flex, TextInput, ColorInput } from "../../styles/styled-components";
import { Container, Row, Col } from "styled-bootstrap-grid";
import Leaderboard from "../../components/Leaderboard.js";
import CanvasUtils from "../../Utils/CanvasUtils.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'

export default function Room({ room_id, backendURL }) {
    const [playerInGame, setPlayerInGame] = useState(false);
    const [players, setPlayers] = useState([]);
    const [selectedPlayerColor, setSelectedPlayerColor] = useState(0);
    const [socket, setSocket] = useState(null);

    useDisconnectSocketOnLeave(socket);
    useEffect(() => {
        setSocket(io(backendURL + "/rooms"));
    }, [])
    useEffect(() => {
        if (!socket) return;
        socket.emit('join-room', room_id,);

        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        CanvasUtils.Config(canvas);
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
            CanvasUtils.ClearCanvas();
            CanvasUtils.DrawGridOutline(GRID_SIZE, CELL_SIZE);
            CanvasUtils.DrawSnakes(CELL_SIZE, players);
            CanvasUtils.DrawApple(CELL_SIZE, apple);
        })
        const handleKeyDown = (e) => {
            const key = e.key;
            if (key == "ArrowUp" || key == "w" || key == "W") SendTargetDirection("up");
            else if (key == "ArrowDown" || key == "s" || key == "S") SendTargetDirection("down");
            else if (key == "ArrowLeft" || key == "a" || key == "A") SendTargetDirection("left");
            else if (key == "ArrowRight" || key == "d" || key == "D") SendTargetDirection("right");
        }
        document.removeEventListener("keydown", handleKeyDown);
        document.addEventListener("keydown", handleKeyDown)
        function SendTargetDirection(targetDirection) {
            socket.emit('update-target-direction', targetDirection);
        }
        return () => {
            socket.disconnect();
            document.removeEventListener("keydown", handleKeyDown);
            setPlayerInGame(false);
        }
    }, [socket])

    const joinGame = () => {
        const name = document.getElementById("name-input").value;
        if (name.length > 10) return alert("Name is too long");
        if (name.length < 1) return alert("Name is empty");
        setCookies("player_name", name, {
            maxAge: 604800,
        });
        socket.emit("join-game", name, selectedPlayerColor, (error, message) => {
            if (!error) {
                setPlayerInGame(true);
            } else {
                alert(message);
            }
        })
    }
    const leaveGame = () => {
        socket.emit("leave-game");
        setPlayerInGame(false);
    }
    const changeColor = (shift) => {
        const COLORS_COUNT = 6;
        let newColor = (selectedPlayerColor + shift) % COLORS_COUNT;
        if (newColor < 0) newColor = COLORS_COUNT - 1;
        setSelectedPlayerColor(newColor);
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
                                <Leaderboard players={players} socketID={socket.id} />
                            </div>
                            <div style={{ marginTop: "auto" }}>
                                <Button bold margin="1.4em" onClick={leaveGame}>Leave game</Button>
                            </div>
                        </>
                        : <>
                            <Flex alignCenter justifyContent="center" column>
                                <TextInput>
                                    <input type="text" required id="name-input" defaultValue={getCookie("player_name") != null ? getCookie("player_name") : ""} maxLength={10} />
                                    <label>Nickname</label>
                                </TextInput>
                                <ColorInput color={selectedPlayerColor}>
                                    <FontAwesomeIcon icon={faChevronLeft} onClick={() => changeColor(-1)} />
                                    <div></div>
                                    <FontAwesomeIcon icon={faChevronRight} onClick={() => changeColor(1)} />
                                </ColorInput>
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
    const backendURL = process.env.BACKEND_URL || "http://localhost:8080";
    const room_id = context.query.room_id;
    const doesExist = await fetch(backendURL + "/api/room-exists", {
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
            room_id: room_id,
            backendURL
        }
    }
}