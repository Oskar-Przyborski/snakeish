import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { Title, Flex } from "../styles/styled-components"
import { useState, useEffect } from "react";

export default function PlayersList({ players, socketID, maxPlayers }) {
    const [sortedPlayers, setSortedPlayers] = useState([]);
    const [hiddenPlayers, setHiddenPlayers] = useState(0)
    useEffect(() => {
        const newSortedPlayers = players.sort((a, b) => b.gameData.score - a.gameData.score);
        const hiddenPlayers = newSortedPlayers.length - maxPlayers;
        newSortedPlayers.splice(maxPlayers, hiddenPlayers);
        setSortedPlayers(newSortedPlayers);
        setHiddenPlayers(hiddenPlayers);

    }, [players, maxPlayers])
    return (<div>
        <Title center responsive>Players</Title>
        <Flex column fontSize="1.5em">
            {sortedPlayers.map((player, idx) => {
                return <div key={idx} style={{ margin: "0.2em" }}>
                    {player.socketID == socketID && <FontAwesomeIcon icon={faUser} />} {player.gameData.name}
                </div>
            })}
            {hiddenPlayers > 0 && <div style={{ margin: "0.2em" }}>+ {hiddenPlayers} more players</div>}
        </Flex>
    </div >)
}