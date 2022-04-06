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
    transition: border-bottom 0.2s;
  }
  input:focus { 
    outline:none;
    border-bottom-color: #a0ecd0;
    border-bottom-width: 3px;
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
  &:focus, &:active, &:hover {
    background-color: #a0ecd0;
    color: black;
  }
`;

const StartForm = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`;


export default function Home() {
  const router = useRouter();
  
  const JoinRoom = () => {
    let room_input = document.getElementById("room_input").value;
    let name_input = document.getElementById("name_input").value;
    if (room_input && name_input)
      if (room_input != "" && name_input != "") {
        router.push(`/room/${room_input}`);
      }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Title>Snakeish</Title>
          </Col>
        </Row>
        <StartForm>
          <TextInput>
            <input id="name_input" required autoComplete="off" />
            <label>Nickname</label>
          </TextInput>
          <TextInput>
            <input id="room_input" required autoComplete="off" />
            <label>Room</label>
          </TextInput>
          <Button onClick={JoinRoom}>Join Room</Button>
        </StartForm>
      </Container>
    </>
  )
}