import { setCookies } from "cookies-next";
import { useRouter } from "next/router";
import { Col, Container, Row } from "styled-bootstrap-grid";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
`;
const TextInput = styled.div`
  position:relative; 
  margin-bottom:35px; 
  input {
    color: #fff;
    font-size:18px;
    padding:10px 10px 10px 5px;
    display:block;
    width:300px;
    border:none;
    border-bottom:1px solid #a0ecd0;
    background-color:transparent;
    transition: border-bottom 0.2s, margin-bottom 0.2s;
    width:90%;
  }
  input:focus { 
    outline:none;
    border-bottom-color: #a0ecd0;
    border-bottom-width: 3px;
    margin-bottom: -2px;
  }

  label {
    color:#fff; 
    font-size:18px;
    font-weight:normal;
    position:absolute;
    pointer-events:none;
    left:5px;
    top:10px;
    transition:0.2s ease all; 
  }

  input:focus ~ label, input:valid ~ label{
    top:-20px;
    font-size:14px;
    color:#fff;
  }
`;
const Button = styled.button`
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  padding:0.8em 1.7em;
  font-size:1.3em;
  border-radius:.4em;
  border: 3px solid #a0ecd0;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  &:active, &:hover {
    background-color: #a0ecd0;
    color: black;
  }
`;

const FlexCenter = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`;
const Outline = styled.div`
  border: 3px solid #a0ecd0;
  border-radius:.6em;
  padding: 3em;
  margin: 1em;
`

export default function Home() {
  const router = useRouter();

  const JoinRoom = () => {
    let room_input = document.getElementById("room_input").value;
    let name_input = document.getElementById("name_input").value;
    if (room_input && name_input)
      if (room_input != "" && name_input != "") {
        setCookies("player_name", name_input, { maxAge: 60 * 60 * 24 * 7 });
        router.push(`/room/${room_input}`);
      }
  };

  const CreateRoom = () => {

  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Title>Snakeish</Title>
          </Col>
        </Row>
        <Row style={{ marginBottom: "45px" }}>
          <Col>
            <FlexCenter>
              <TextInput>
                <input id="name_input" required autoComplete="off" />
                <label>Nickname</label>
              </TextInput>
            </FlexCenter>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Outline>
              <FlexCenter>
                <TextInput>
                  <input id="room_input" required autoComplete="off" width={"80%"}/>
                  <label>Room</label>
                </TextInput>
                <Button onClick={JoinRoom}>Join room</Button>
              </FlexCenter>
            </Outline>
          </Col>
          <Col md={6}>
            <Outline>
              <FlexCenter>
                <h1 style={{marginTop:".3em"}}>Don't have a room?</h1>
                <Button onClick={CreateRoom}>Create room</Button>
                <br/>
                (available soon)
              </FlexCenter>
            </Outline>
          </Col>
        </Row>
      </Container>
    </>
  )
}