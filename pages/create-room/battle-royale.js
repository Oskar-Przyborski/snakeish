import Head from "next/head";
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState, forwardRef } from "react";
import { Container, Row, Col } from "styled-bootstrap-grid"
import { Title, TextInput, Button, Flex, RangeInput, SwitchInput, CreateRoomGrid } from "../../styles/styled-components"


export default function CreateRoomBattleRoyale(props) {
    const router = useRouter();
    const [minPlayers, setMinPlayers] = useState(2);
    const createRoomHandle = async () => {
        const room_ID = document.getElementById("room-id-input").value;
        const data = {
            room_ID,
            gameModeIndex: 1,
            settings: {
                min_players: minPlayers
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
            <title>Create Room - Snakeish</title>
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
                            <div style={{ margin: "0.2em 1em" }}>{minPlayers}</div>
                            <input type="range" min="2" max="16" defaultValue="2" onChange={(e) => setMinPlayers(e.target.value)} />
                        </Flex>
                    </RangeInput>
                </div>
                <div className="rightCol">
                    Minimum number of players needed to start the game. The game will start 15s after the number of players reaches this number.
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