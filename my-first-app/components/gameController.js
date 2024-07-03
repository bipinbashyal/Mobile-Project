import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { useState } from "react";

const GameController = ({ socket }) => {
  const [timer, setTimer] = useState("");
  function sendData(data) {
    socket.emit("keyPress", data);
  }

  function sendDataRepeatedly(data) {
    const timer = setInterval(() => {
      if (socket) socket.emit("keyPress", data);
    }, 80);
    setTimer(timer);
  }

  function handlePressOut() {
    if (timer) clearInterval(timer);
    setTimer(null);
  }

  const keys = ["up", "left", "space", "right", "down"];
  const Buttons = keys.map((data) => (
    <TouchableOpacity
      onLongPress={() => {
        sendDataRepeatedly(data);
      }}
      onPressOut={handlePressOut}
      style={styles.button}
      onPress={() => {
        sendData(data);
      }}
      key={data}
    >
      <Text>{data}</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <View>{[Buttons[0]]}</View>

      <View
        style={{
          width: 600,
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {[Buttons[1], Buttons[2], Buttons[3]]}
      </View>

      <View>{[Buttons[4]]}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    margin: "3px",
    backgroundColor: "gray",
    height: 80,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GameController;
