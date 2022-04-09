import { Flex, Title, Button } from "../styles/styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link";

export default function AvailableRoomsListItem({ room }) {
    return (
        <li style={{ margin: "1.1em 0" }}>
            <div style={{ backgroundColor: "#D62246", borderTopRightRadius: "1em", borderBottomRightRadius: "1em", padding: "0.3em 1em" }}>
                <Flex alignCenter>
                    <Title responsive style={{ margin: "0.3em 0.5em" }}>{room.room_ID}</Title>
                    <div style={{ fontSize: "1.5em", margin: "0em 0.5em" }}><FontAwesomeIcon icon={faUsers} /><span style={{ fontWeight: "bold" }}> {room.players.length}</span></div>
                    <Link href={"/room/" + room.room_ID}><Button padding="0.4em 0.7em" style={{ marginLeft: "auto" }}>Join</Button></Link>
                </Flex>
            </div>
        </li>
    )
}