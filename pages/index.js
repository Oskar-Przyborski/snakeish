import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Col, Container, Row } from "styled-bootstrap-grid";
import { Title, Button, Flex, RedBg } from "../styles/styled-components";
import AvailableRoomsListItem from "../components/AvailableRoomsListItem";
import RefreshIcon from "../components/RefreshIcon";
import Footer from "../components/Footer.js";
import Head from "next/head";

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
        <title>Snakeish</title>
        <meta name="google-site-verification" content="FDMhHEchGqgnn4gAt-QxgZNKZKKCVurZwytJiJipaKU" />
      </Head>
      <Container>
        <Row>
          <Col>
            <Title center>Snakeish</Title>
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
              <Link href="/create-room" passHref><Button bold>Create room</Button></Link>
            </Flex>
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
