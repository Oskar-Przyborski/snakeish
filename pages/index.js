import { useState } from "react"
import Link from "next/link";

export default function Home() {
  const [roomIDInput, setRoomIDInput] = useState("");

  return (
    <>
      <h1>Snakeish</h1>
      <input placeholder="Room ID" value={roomIDInput} onChange={e => setRoomIDInput(e.target.value)} />
      <Link href={"/room/"+ roomIDInput}>Join Now!</Link>
      
    </>
  )
}