import React, { useEffect, useState } from "react";
import { View, StyleSheet, PanResponder, Text } from "react-native";
import io from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);

  useEffect(() => {
    const newSocket = io("http://10.100.51.250:3000");
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      setDx(gestureState.dx);
      setDy(gestureState.dy);
      if (socket) {
        socket.emit("move", { dx: gestureState.dx, dy: gestureState.dy });
      }
    },
    onPanResponderRelease: () => {
      setDx(0);
      setDy(0);
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text>Move your finger to control the mouse</Text>
      <Text>
        dx: {dx}, dy: {dy}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
