import { DeviceMotion } from "expo-sensors";

const UPDATE_INTERVAL = 300; // Update interval in milliseconds

const TiltDetection = (socket) => {
  const onDeviceMotion = ({ accelerationIncludingGravity }) => {
    const { x, y, z } = accelerationIncludingGravity;
    socket?.emit("tilt", Number(y.toFixed(1)));
  };

  // Set update interval and add listener
  DeviceMotion.setUpdateInterval(UPDATE_INTERVAL);
  DeviceMotion.addListener(onDeviceMotion);

  // Return a function to stop tilt tracking
  return () => {
    DeviceMotion.removeAllListeners();
  };
};
export default TiltDetection;
