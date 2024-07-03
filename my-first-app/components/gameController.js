import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const GameController = ({ socket }) => {
  function handlePressIn(data) {
    console.log("pressed", data);
    if (socket) socket.emit("pressIn", data);
  }

  function handlePressOut(data) {
    if (socket) socket.emit("pressOut", data);
  }

  const keys = ["up", "left", "space", "right", "down"];
  const Buttons = keys.map((data) => (
    <TouchableOpacity
      onPressIn={() => {
        handlePressIn(data);
      }}
      onPressOut={() => {
        handlePressOut(data);
      }}
      style={styles.button}
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
