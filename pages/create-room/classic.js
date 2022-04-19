import Head from "next/head";
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState, forwardRef } from "react";
import { Container, Row, Col } from "styled-bootstrap-grid"
import { Title, TextInput, Button, Flex, RangeInput, SwitchInput, CreateRoomGrid } from "../../styles/styled-components"

export default function CreateRoomClassic(props) {
    const router = useRouter();
    const [apples_quantity, setApplesQuantity] = useState(1);
    const createRoomHandle = async () => {
        const room_ID = document.getElementById("room-id-input").value;
        const frame_time_idx = document.getElementById("frame-time-input").value;
        const grid_size_idx = document.getElementById("grid-size-input").value;
        const collide_with_enemies = document.getElementById("collide-with-enemies-input").checked;
        const frame_time = 0;
        switch (frame_time_idx) {
            case "1":
                frame_time = 1000;
                break;
            case "2":
                frame_time = 500;
                break;
            case "3":
                frame_time = 300;
                break;
            case "4":
                frame_time = 250;
                break;
            case "5":
                frame_time = 175;
                break;
            case "6":
                frame_time = 125;
            case "7":
                frame_time = 75;
        }
        const grid_size = 0;
        switch (grid_size_idx) {
            case "1":
                grid_size = 6;
                break;
            case "2":
                grid_size = 10;
                break;
            case "3":
                grid_size = 14;
                break;
            case "4":
                grid_size = 18;
                break;
            case "5":
                grid_size = 24;
            case "6":
                grid_size = 28;
            case "7":
                grid_size = 35;
        }
        const data = {
            room_ID,
            gameModeIndex: 0,
            settings: {
                apples_quantity,
                frame_time,
                grid_size,
                collide_with_enemies
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
            router.push("/classic/" + room_ID);
        }
    }

    const NextModeBtn = forwardRef(function NextModeBtn(props, ref) {
        return (
            <FontAwesomeIcon icon={props.right ? faChevronRight : faChevronLeft} forwardedRef={ref} onClick={props.onClick} style={props.style} />
        )
    })
    return (<>
        <Head>
            <title>Snakeish - Create Classic Room</title>
            <meta name="title" content="Snakeish - Create Classic Room" />
            <meta name="description" content="Create Room with classic game mode in Snakeish - online multiplayer snake game"></meta>
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
                        <Link href="battle-royale" passHref ><NextModeBtn style={{ margin: "1em 2em" }} /></Link>
                        <h2>Classic</h2>
                        <Link href="battle-royale" passHref><NextModeBtn right style={{ margin: "1em 2em" }} /></Link>
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
                        Speed
                        <input type="range" required id="frame-time-input" min={1} max={7} step={1} defaultValue={4} />
                        <Flex justifyContent="space-between" style={{ fontSize: "0.8em" }}>
                            <div>Slow</div>
                            <div>Normal</div>
                            <div>Fast</div>
                        </Flex>
                    </RangeInput>
                </div>
                <div className="rightCol">
                    The speed of the game. If you want more dynamic gameplay, increase the speed.
                </div>
                <div className="leftCol odd">
                    <RangeInput>
                        Grid size
                        <input type="range" required id="grid-size-input" min={1} max={7} step={1} defaultValue={4} />
                        <Flex justifyContent="space-between" style={{ fontSize: "0.8em" }}>
                            <div>Small</div>
                            <div>Normal</div>
                            <div>Big</div>
                        </Flex>
                    </RangeInput>
                </div>
                <div className="rightCol odd">
                    The size of the grid.
                </div>
                <div className="leftCol">
                    <RangeInput>
                        Apples quantity<br />
                        <Flex>
                            <div style={{ margin: "0.2em 1em" }}>{apples_quantity}</div>
                            <input type="range" required id="grid-size-input" min={1} max={10} step={1} defaultValue={1} onChange={(x) => { setApplesQuantity(x.target.value) }} />
                        </Flex>
                    </RangeInput>
                </div>
                <div className="rightCol">
                    The number of apples that will be on the grid at the same time.
                </div>
                <div className="leftCol odd">
                    <Flex margin="0.5em">
                        <div>Collide with enemies</div>
                        <SwitchInput size={0.8}>
                            <input type="checkbox" id="collide-with-enemies-input" />
                            <span className="slider"></span>
                        </SwitchInput>
                    </Flex>
                </div >
                <div className="rightCol odd">
                    If checked, the snake will collide with the enemies.
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