import { HubConnectionBuilder } from "@microsoft/signalr";
import { WaitingRoom } from "./Components/WaitingRoom";
import { Chat } from "./Components/Chat";
import { useState} from "react";

function App() {
  const [connection, setConnection] = useState(null);
  const [chatRoom, setChatRoom] = useState("");
  const [messages, setMessages] = useState([]);

  const joinChat = async (userName, chatRoom) => {
    var connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5208/chat")
    .withAutomaticReconnect()
    .build();

    connection.on("ReceiveMessage", (userName, message) => {
      setMessages((messages) => [...messages, { userName, message }]);
      console.log(userName);
      console.log(message);
    })

    try {
      await connection.start();
      await connection.invoke("JoinChat", {userName, chatRoom });

      setChatRoom(chatRoom);
      setConnection(connection);
      console.log(connection);

    } catch (error) {
      console.log(error);
    }
  }

  const sendMessage = (message) => {
    connection.invoke("SendMessage", message)
  }

  const closeChat = async () => {
    await connection.stop()
    setConnection(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {connection ? 
        <Chat messages={messages} chatRoom={chatRoom} closeChat={closeChat} sendMessage={sendMessage}/> 
        : <WaitingRoom joinChat={joinChat}/>}
    </div>
  );
}

export default App;
