import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Col, Container, Row } from "styled-bootstrap-grid";
import { Title, Button, Flex, RedBg } from "../styles/styled-components";
import AvailableRoomsListItem from "../components/AvailableRoomsListItem";
import RefreshIcon from "../components/RefreshIcon";
import Footer from "../components/Footer.js";
import Head from "next/head";
import Image from "next/image";
export default function Home(props) {
  const router = useRouter();
  const [rooms, setRooms] = useState(props.rooms);

  const refreshList = async () => {
    const response = await fetch(props.backendURL + "/api/rooms");
    const data = await response.json();
    setRooms(data);
  }
  useEffect(() => {
    refreshList();
  }, []);
  return (
    <div style={{
      position: "relative",
      minHeight: "100vh"
    }}>
      <Head>
        <title>Snakeish - Online Multiplayer Snake Game</title>
        <meta name="title" content="Snakeish - Online Multiplayer Snake Game" />
        <meta name="description" content="Snakeish - Best free online multiplayer snake game with two game modes - classic and battle-royale.
Play with friends!"></meta>
        <meta name="google-site-verification" content="FDMhHEchGqgnn4gAt-QxgZNKZKKCVurZwytJiJipaKU" />
      </Head>
      <Container>
        <Row>
          <Col>
            <Flex justifyContent="center" margin="1em">
              <Image src="/Logo-long-white.png" width={310} height={60} alt="logo" />
            </Flex>
          </Col>
        </Row>
        {props.currentWorkingVersionURL != null && <Row>
          <Col>
            <RedBg style={{ textAlign: "center" }}>
              This version is propably not working properly.  <Link href={props.currentWorkingVersionURL} ><span style={{ textDecoration: "underline", cursor: "pointer" }}>This version</span></Link> should work, if not please wait for updates.
            </RedBg>
          </Col>
        </Row>}

        <Row style={{ borderRadius: "1em", overflow: "hidden" }}>
          <Col md={9} style={{ backgroundColor: "#4A525A", padding: "0.5em 2em 0.5em 0" }}>
            <Flex alignCenter justifyContent="space-between">
              <Title center style={{ marginLeft: "1em" }}>Available rooms</Title>
              <RefreshIcon onClick={refreshList} />
            </Flex>
            {rooms && rooms.length > 0 ?
              <ul style={{ listStyle: "none", padding: "0" }}>
                {rooms.map((room, idx) => (
                  <AvailableRoomsListItem room={room} key={idx} />
                ))}
              </ul> :
              <Title center>
                &#128557; List is empty...
              </Title>
            }
          </Col>
          <Col md={3} style={{ backgroundColor: "#D62246", padding: "1em" }}>
            <Flex justifyCenter column alignCenter>
              <Title center>Wanna have own room?</Title>
              <Link href="/create-room/classic" passHref><Button bold>Create room</Button></Link>
            </Flex>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Snakeish</h1>
            {/* SEO description*/}
            <p>Online multiplayer traditional snake game that contains two game modes - classic and battle-royale.</p>
            <h2>Classic</h2>
            <p>Classic mode is a classic snake game. Use your keyboard arrows or WASD to move your snake.<br />
              Eat apples to grow you snake, but don&apos;t hit walls, yourself or other snakes, or you will die.<br />
              Gameplay is highly customizable for example size of the grid or speed of the game.
            </p>
            <h2>Battle-royale</h2>
            <p>Battle-royale mode is something different and even more challenging.<br />
              The goal is to be the last snake alive, but it&apos;s not that easy.<br />
              At the beggining of the game you wait for the lobby to be full. Then the game starts.<br />
              You need to eat apples to grow you snake, because every 15 seconds shortest snake in the game will die<br />
              Also every 15 seconds the map will shrink and if you go inside that dead zone your snake will be shortening.<br />
              If you go outside the map, hit yourself or other snakes, you will die.<br />
              <br />
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}
export async function getServerSideProps(context) {
  const backendURL = process.env.BACKEND_URL || "http://localhost:8080";
  const resp = await fetch(backendURL + "/api/rooms")
  const rooms = await resp.json()
  const currentWorkingVersionURL = process.env.CURRENT_WORKING_VERSION_URL || null;
  return {
    props: {
      rooms,
      backendURL,
      currentWorkingVersionURL
    }
  }
}
