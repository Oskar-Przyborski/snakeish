import { Title } from "../styles/styled-components"
export default function Leaderboard(props) {
    return (<div>
        <Title center responsive>Leaderboard</Title>
        <table style={{ width: "100%", textAlign: "center", fontSize: "1.3em" }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.players.map((player, idx) => {
                        return <tr key={idx}>
                            <td>{player.gameData.name}</td>
                            <td>{player.gameData.score}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div >)
}