import { useEffect, useState } from "react";
import { io } from 'socket.io-client'
import { useDisconnectSocketOnLeave } from "../../components/disconnectSocketOnLeave";
import { getCookie, setCookies } from "cookies-next";
import { Title, Button, Flex, TextInput, ColorInput } from "../../styles/styled-components";
import { Container, Row, Col } from "styled-bootstrap-grid";
import CanvasUtils from "../../Utils/CanvasUtils.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'
import Head from "next/head";
import PlayersList from "../../components/PlayersList";
import BattleRoyaleLeaderboard from "../../components/BattleRoyaleLeaderboard";
import MobileInput from "../../components/MoblieInput";
import InviteFriends from "../../components/InviteFriends";
export default function Room({ room_id, backendURL }) {
    const [playerInGame, setPlayerInGame] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [players, setPlayers] = useState([]);
    const [selectedPlayerColor, setSelectedPlayerColor] = useState(0);
    const [socket, setSocket] = useState(null);
    const [showMobileInput, setShowMobileInput] = useState(false);

    useDisconnectSocketOnLeave(socket);
    useEffect(() => {
        const cookiePlayerColor = getCookie("player_colorIDX");
        if (cookiePlayerColor)
            setSelectedPlayerColor(cookiePlayerColor);
        setSocket(io(backendURL + "/rooms"));
    }, [])
    useEffect(() => {
        if (!socket) return;
        socket.emit('join-room', room_id,);

        let canvas = document.getElementById("canvas");
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
            if (!data.game_status.started) {
                if (isGameStarted) setIsGameStarted(false);
                const min_players = data.min_players;
                const waiting_players = data.players.length
                setPlayers(data.players);
                const countdown = data.countdown;
                CanvasUtils.ClearCanvas();
                CanvasUtils.DrawWaitingPlayers(waiting_players, min_players, countdown);
            }
            if (data.game_status.started && !data.game_status.ended) {
                if (!isGameStarted) setIsGameStarted(true);
                const { players, apples, grid_size, shrink_size } = data;
                const cell_size = canvas.width / grid_size;
                setPlayers(players);
                CanvasUtils.ClearCanvas();
                CanvasUtils.DrawGridOutline(grid_size, cell_size);
                CanvasUtils.DrawApples(cell_size, apples);
                CanvasUtils.DrawSnakes(cell_size, players);
                CanvasUtils.DrawShrink(cell_size, grid_size, shrink_size);
                if (data.freeze_time >= 0) CanvasUtils.DrawFreezeTime(data.freeze_time);
                else
                    if (data.shrink_time >= 0) CanvasUtils.DrawMapShrinkTime(data.shrink_time);
                    else if (data.kill_shortest_time >= 0) CanvasUtils.DrawKillShortestTime(data.kill_shortest_time);
                return;
            }
            if (data.game_status.ended) {
                setIsGameStarted(false);
                setPlayers(data.players);
                CanvasUtils.ClearCanvas();

                CanvasUtils.DrawEndGame(data.winner, data.restart_countdown);
            }
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
        window.onresize()
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
        setCookies("player_colorIDX", selectedPlayerColor, {
            maxAge: 604800,
        });
        socket.emit("join-game", name, selectedPlayerColor, (error, message) => {
            if (!error) {
                setPlayerInGame(true);
            } else {
                alert(message);
            }
        })
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            setShowMobileInput(true);
        }
    }
    const leaveGame = () => {
        socket.emit("leave-game");
        setPlayerInGame(false);
        setShowMobileInput(false);
    }
    const changeColor = (shift) => {
        const COLORS_COUNT = 11;
        let newColor = (selectedPlayerColor + shift) % COLORS_COUNT;
        if (newColor < 0) newColor = COLORS_COUNT - 1;
        setSelectedPlayerColor(newColor);
    }
    return (<>
        <Head>
            <title>Snakeish Room: {room_id}</title>
        </Head>
        <Flex justifyContent="center" margin="0 102px 0 0">
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
                        <canvas id="canvas" width={600} height={600} style={{ imageRendering: "crisp-edges" }} />
                    </Flex>
                </Col>
                <Col lg={4} style={{ backgroundColor: "#D62246", padding: "0em 0.5em", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    {playerInGame ?
                        <>
                            <div style={{ marginBottom: "auto" }}>
                                {isGameStarted ? <BattleRoyaleLeaderboard players={players} socketID={socket.id} maxPlayers={5} /> : <PlayersList players={players} socketID={socket.id} maxPlayers={5} />}
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
                                <InviteFriends />
                            </Flex>
                        </>
                    }
                </Col>
            </Row>
            {showMobileInput && <MobileInput ChangeDirectionCallback={(dir) => socket.emit('update-target-direction', dir)} />}
        </Container>
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