import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { Title } from "../styles/styled-components"
import { useState, useEffect } from "react";
export default function BattleRoyaleLeaderboard({ players, socketID, maxPlayers }) {
    const [sortedPlayers, setSortedPlayers] = useState([]);
    const [hiddenPlayers, setHiddenPlayers] = useState(0)
    useEffect(() => {
        const newSortedPlayers = players.sort((a, b) => b.gameData.isKilled ? -1 : b.gameData.score - a.gameData.score);
        const hiddenPlayers = newSortedPlayers.length - maxPlayers;
        newSortedPlayers.splice(maxPlayers, hiddenPlayers);
        setSortedPlayers(newSortedPlayers);
        setHiddenPlayers(hiddenPlayers);

    }, [players, maxPlayers])
    return (<div>
        <Title center responsive>Leaderboard</Title>
        <table style={{ width: "100%", textAlign: "center", fontSize: "1.3em" }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Alive</th>
                </tr>
            </thead>
            <tbody>
                {
                    sortedPlayers.map((player, idx) => {
                        return <tr key={idx}>
                            <td>{(socketID == player.socketID ? <FontAwesomeIcon icon={faUser} /> : "")} {player.gameData.name}</td>
                            <td>{player.gameData.score}</td>
                            <td>{!player.gameData.isKilled ? "✅" : "❌"}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        {hiddenPlayers > 0 && < div style={{ margin: "0.2em" }}>+ {hiddenPlayers} more players</div>}
    </div >)
}