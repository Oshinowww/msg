import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {

    socket.off("receive_message").on("receive_message", (data) => {

      setMessageList((list) => [...list, data]);

    });

  }, [socket]);
  const y1="h-auto flex p-3 justify-start";
  const o1 ="h-auto flex p-3 justify-end";
  const y = "flex justify-start text-xs ";
  const o = "flex justify-end text-xs ";
  const mcy = "h-auto  w-auto max-h-10 max-w-32 bg-blue-500 border rounded-md text-white flex align-middle mx-5 px-5 py-1 break-words";
 const mco = "h-auto w-auto max-h-10 max-w-32 bg-green-500 border rounded-md text-white flex align-middle mx-5 px-5 py-1 break-words";
  return (
    <div>
      <div className="relative">
        <p className="block text-center">Chat</p>
      </div>
      <div className="relative h-[70vh]">
        <ScrollToBottom className="overflow-x-hidden overflow-y-scroll w-full h-full border border-black rounded-md scrollbar-none">
          {messageList.map((messageContent) => {
            return (
              <div
                className={username === messageContent.author ? y1 : o1}
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className={username === messageContent.author ? mcy : mco}>
                    <p>{messageContent.message}</p>
                  </div>
                  <div className={username === messageContent.author ? y : o}>
                    <p>{messageContent.time}&#160;</p>
                    <p className="font-bold">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="flex h-10">
        <input
         className="h-full flex-[85%] border mt-2 rounded-md border-black px-2"
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button className="bg-black text-white rounded-md ml-2 mt-2 w-12" onClick={sendMessage}>send</button>
      </div>
    </div>
  );
}

export default Chat;