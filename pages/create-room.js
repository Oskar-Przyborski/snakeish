import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookie } from "cookies-next";
import { Container, Row, Col } from "styled-bootstrap-grid"
import { Outline, Title, TextInput, Button, Flex, RangeInput } from "../styles/styled-components"

export default function CreateRoom(props) {
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
        frame_time = 250;
        break;
      case "4":
        frame_time = 125;
        break;
      case "5":
        frame_time = 75;
    }
    const grid_size = 0;
    switch (grid_size_idx) {
      case "1":
        grid_size = 8;
        break;
      case "2":
        grid_size = 12;
        break;
      case "3":
        grid_size = 16;
        break;
      case "4":
        grid_size = 30;
        break;
      case "5":
        grid_size = 40;
    }
    const resp = await fetch(props.backendURL + "/api/create-room", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ room_ID, frame_time, grid_size })
    })
    const data = await resp.text()
    document.getElementById("output").textContent = data
  }

  return (<>
    <Container>
      <Row>
        <Col>
          <Title center>Create Room</Title>
          <div style={{ backgroundColor: "#4A525A", borderRadius: "1em" }}>
            <Flex column justifyContent="center" alignCenter>
              <TextInput>
                <input type="text" required id="room-id-input" autoComplete="off" defaultValue={getCookie("player_name") != null ? getCookie("player_name") + "'s room" : ""} />
                <label>Room name</label>
              </TextInput>
              <RangeInput>
                Speed
                <input type="range" required id="frame-time-input" min={1} max={5} step={1} defaultValue={3} list="frame-time-list" />
                <Flex justifyContent="space-between" style={{ fontSize: "0.8em" }}>
                  <div>Slow</div>
                  <div>Normal</div>
                  <div>Fast</div>
                </Flex>
              </RangeInput>
              <RangeInput>
                Grid size
                <input type="range" required id="grid-size-input" min={1} max={5} step={1} defaultValue={3} list="frame-time-list" />
                <Flex justifyContent="space-between" style={{ fontSize: "0.8em" }}>
                  <div>Small</div>
                  <div>Normal</div>
                  <div>Big</div>
                </Flex>
              </RangeInput>
              <Button onClick={createRoomHandle}>CREATE</Button>
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