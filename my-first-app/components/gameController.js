import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Socket from "../utils/socket";

const GameController = ({ route }) => {
  const address = route.params;
  console.log(address);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(Socket(address));
  }, []);
  function handlePressIn(data) {
    // if (socket) socket.emit("pressIn", data);
    if (socket) {
      console.log(data);
      socket.send(JSON.stringify({ type: "pressIn", value: data }));
    }
  }
  function handlePressOut(data) {
    if (socket) {
      socket.send(JSON.stringify({ type: "pressOut", value: data }));
    }
  }

  const keys = [
    ["up", "Accelerate"],
    ["space", "Nitro"],
    ["down", "Break"],
  ];
  const Buttons = keys.map((data) => (
    <TouchableOpacity
      onPressIn={() => {
        handlePressIn(data[0]);
      }}
      onPressOut={() => {
        handlePressOut(data[0]);
      }}
      style={styles.button}
      key={data[1]}
    >
      <Text style={styles.text}>{data[1]}</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          justifyContent: "space-between",
        }}
      >
        <View style={{ backgroundColor: "green", borderRadius: 50 }}>
          {Buttons[0]}
        </View>
        <View style={{ backgroundColor: "red", borderRadius: 50 }}>
          {Buttons[2]}
        </View>
      </View>
      <View style={{ backgroundColor: "blue", borderRadius: 70 }}>
        {[Buttons[1]]}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
  button: {
    // margin: "3px",
    height: 130,
    width: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});

export default GameController;
