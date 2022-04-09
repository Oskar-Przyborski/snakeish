import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col } from "styled-bootstrap-grid"
import { FlexCenter, Outline, Title, TextInput, Button, Flex } from "../styles/styled-components"
export default function CreateRoom() {
  const createRoomHandle = async () => {
    const room_ID = document.getElementById("room-id-input").value;
    const frame_time = document.getElementById("frame-time-input").value;
    const grid_size = document.getElementById("grid-size-input").value;

    const resp = await fetch("http://snakeish-backend.herokuapp.com/api/create-room", {
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
                <input type="text" required id="room-id-input" />
                <label>Room name</label>
              </TextInput>
              <TextInput>
                <input type="text" required id="frame-time-input" />
                <label>Frame time</label>
              </TextInput>
              <TextInput>
                <input type="text" required id="grid-size-input" />
                <label>Grid size</label>
              </TextInput>
              <Button onClick={createRoomHandle}>CREATE</Button>
              <p id="output"></p>
            </Flex>
          </div>
        </Col>
      </Row>
      <Row>

      </Row>
    </Container>
  </>)
}