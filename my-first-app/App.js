import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Mouse from "./components/mouse";
import GameController from "./components/gameController";

const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://10.100.51.250:3000");
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return (
    // {/* <Mouse socket={socket} /> */}
    <GameController socket={socket} />
  );
};

export default App;
