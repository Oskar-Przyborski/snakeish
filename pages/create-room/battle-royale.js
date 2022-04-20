import Head from "next/head";
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState, forwardRef } from "react";
import { Container } from "styled-bootstrap-grid"
import { Title, TextInput, Button, Flex, RangeInput, SwitchInput, CreateRoomGrid } from "../../styles/styled-components"


export default function CreateRoomBattleRoyale(props) {
    const router = useRouter();
    const [minPlayers, setMinPlayers] = useState(3);
    const [gameSpeedUpValue, setGameSpeedUpValue] = useState(0.1);
    const [gridSizePerPlayer, setGridSizePerPlayer] = useState(8);
    const createRoomHandle = async () => {
        const room_ID = document.getElementById("room-id-input").value;
        const dead_zone_kills = document.getElementById("dead-zone-kills-input").checked;
        console.log(gameSpeedUpValue)
        const data = {
            room_ID,
            gameModeIndex: 1,
            settings: {
                min_players: minPlayers,
                dead_zone_kills,
                game_speed_up_value: gameSpeedUpValue,
                grid_size_per_player: gridSizePerPlayer
            }
        }
        const resp = await fetch(props.backendURL + "/api/create-room", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(data)
        })
        if (resp.status !== 200) {
            const data = await resp.text()
            document.getElementById("output").textContent = data
        } else {
            router.push("/battle-royale/" + room_ID);
        }
    }
    const NextModeBtn = forwardRef(function NextModeBtn(props, ref) {
        return (
            <FontAwesomeIcon icon={props.right ? faChevronRight : faChevronLeft} forwardedRef={ref} onClick={props.onClick} style={props.style} />
        )
    })
    return (<>
        <Head>
            <title>Snakeish - Create Battle-Royale Room</title>
            <meta name="title" content="Snakeish - Create Battle-Royale Room" />
            <meta name="description" content="Create Room with battle-royale game mode in Snakeish - online multiplayer snake game"></meta>
        </Head>
        <Flex justifyContent="center" margin="0 102px 0 0">
            <div style={{ marginRight: "auto" }}>
                <Link href="/" passHref>
                    <Button padding="0.5em 1em" margin="0.5em 1em">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                </Link>
            </div>
            <div style={{ marginRight: "auto" }}><Title center>Create Room</Title></div>
        </Flex>
        <Container>
            <CreateRoomGrid>
                <div className="fullCol">
                    <Flex align="baseline" fontSize="1.2em">
                        <Link href="classic" passHref ><NextModeBtn style={{ margin: "1em 2em" }} /></Link>
                        <h2>Battle-royale</h2>
                        <Link href="classic" passHref><NextModeBtn right style={{ margin: "1em 2em" }} /></Link>
                    </Flex>
                </div>
                <div className="leftCol odd">
                    <TextInput>
                        <input type="text" required id="room-id-input" autoComplete="off" maxLength={10} />
                        <label>Room name</label>
                    </TextInput>
                </div>
                <div className="rightCol odd">
                    The name of the room. This is how the room will be identified in the lobby. The name must be unique.
                </div>
                <div className="leftCol">
                    <RangeInput>
                        Minimum players
                        <Flex>
                            <div style={{ margin: "0.2em 1em", width: "45px" }}>{minPlayers}</div>
                            <input type="range" min="2" max="16" defaultValue="3" onChange={(e) => setMinPlayers(e.target.value)} />
                        </Flex>
                    </RangeInput>
                </div>
                <div className="rightCol">
                    Minimum number of players needed to start the game. The game will start 5s after the number of players reaches this number.
                </div>
                <div className="leftCol odd">
                    <Flex margin="0.5em">
                        <div>Dead zone kills instantly</div>
                        <SwitchInput size={0.8}>
                            <input type="checkbox" id="dead-zone-kills-input" />
                            <span className="slider"></span>
                        </SwitchInput>
                    </Flex>
                </div >
                <div className="rightCol odd">
                    If checked, dead zone kills instantly, instead of slowly shrotening the snake.
                </div>
                <div className="leftCol">
                    <RangeInput>
                        Game speed-up value
                        <Flex>
                            <div style={{ margin: "0.2em 1em", width: "45px" }}>{gameSpeedUpValue}</div>
                            <input type="range" min="0" max="0.3" step={0.05} defaultValue="0.1" onChange={(e) => setGameSpeedUpValue(e.target.value)} />
                        </Flex>
                    </RangeInput>
                </div>
                <div className="rightCol">
                    Determines how much the game will speed up on every map shrink. 0 means no speed up.
                </div>
                <div className="leftCol odd">
                    <RangeInput>
                        Grid size per player
                        <Flex>
                            <div style={{ margin: "0.2em 1em", width: "45px" }}>{gridSizePerPlayer}</div>
                            <input type="range" min="6" max="12" step={1} defaultValue="8" onChange={(e) => setGridSizePerPlayer(e.target.value)} />
                        </Flex>
                    </RangeInput>
                </div>
                <div className="rightCol odd">
                    How long is the grid per player. For example if it&apos;s set to 8 and 3 players is playing, the grid will be 24x24.
                </div>
                <div className="leftCol">
                    <Button onClick={createRoomHandle} bold>Create &#128640;</Button>
                    <p id="output"></p>
                </div>
                <span className="rightCol"></span>
            </CreateRoomGrid>
        </Container>
    </>)
}
export function getServerSideProps(ctx) {
    const backendURL = process.env.BACKEND_URL || "http://localhost:8080";
    return {
        props: {
            backendURL
        }
    }
}