import TiltDetection from "./tiltDetection";
const Socket = (address) => {
  const socket = new WebSocket(address);
  console.log(socket);
  socket.onopen = () => {
    console.log("Connected to the WebSocket server");
    TiltDetection(socket);
  };
  socket.onclose = () => {
    console.log("Disconnected from the WebSocket server");
  };
  socket.onerror = (error) => {
    console.error(`WebSocket error: ${error}`);
  };
  return socket;
};

export default Socket;
