
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/chat";
const socket = io.connect(import.meta.REACT_APP_ORIGIN);

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
   
  return (
    <div className="grid place-items-center h-full items-center ">
      {!showChat ? (
        <div className="flex flex-col text-center text-white border bg-slate-500 p-5 rounded-md">
          <h3 className="text-xl p-5">Join/Create A Chat</h3>
          <input
          className="border text-black m-3 rounded"
            type="text"
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
          className="border text-black m-3 rounded"
            type="text"
            placeholder="Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button className="rounded-md ml-16  bg-slate-900 hover:bg-slate-800 w-20 " onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;