import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Row, Col } from "styled-bootstrap-grid"
import { Title, TextInput, Button, Flex, RangeInput } from "../styles/styled-components"

export default function CreateRoom(props) {
  const router = useRouter();
  const [apples_quantity, setApplesQuantity] = useState(1);
  const createRoomHandle = async () => {
    const room_ID = document.getElementById("room-id-input").value;
    const frame_time_idx = document.getElementById("frame-time-input").value;
    const grid_size_idx = document.getElementById("grid-size-input").value;

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
    const resp = await fetch(props.backendURL + "/api/create-room", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ room_ID, frame_time, grid_size, apples_quantity })
    })
    if (resp.status !== 200) {
      const data = await resp.text()
      document.getElementById("output").textContent = data
    } else {
      router.push("/room/" + room_ID);
    }
  }

  return (<>
    <Container>
      <Row>
        <Col>
          <Title center>Create Room</Title>
          <div style={{ backgroundColor: "#4A525A", borderRadius: "1em" }}>
            <Flex column justifyContent="center" alignCenter>
              <TextInput>
                <input type="text" required id="room-id-input" autoComplete="off" maxLength={10} />
                <label>Room name</label>
              </TextInput>
              <RangeInput>
                Speed
                <input type="range" required id="frame-time-input" min={1} max={7} step={1} defaultValue={4} />
                <Flex justifyContent="space-between" style={{ fontSize: "0.8em" }}>
                  <div>Slow</div>
                  <div>Normal</div>
                  <div>Fast</div>
                </Flex>
              </RangeInput>
              <RangeInput>
                Grid size
                <input type="range" required id="grid-size-input" min={1} max={7} step={1} defaultValue={4} />
                <Flex justifyContent="space-between" style={{ fontSize: "0.8em" }}>
                  <div>Small</div>
                  <div>Normal</div>
                  <div>Big</div>
                </Flex>
              </RangeInput>
              <RangeInput>
                Apples quantity<br />
                <Flex>
                  <div style={{ margin: "0.2em 1em" }}>{apples_quantity}</div>
                  <input type="range" required id="grid-size-input" min={1} max={10} step={1} defaultValue={1} onChange={(x) => { setApplesQuantity(x.target.value) }} />
                </Flex>
              </RangeInput>
              <Button onClick={createRoomHandle} bold>Create &#128640;</Button>
              <p id="output"></p>
            </Flex>
          </div>
        </Col>
      </Row>
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