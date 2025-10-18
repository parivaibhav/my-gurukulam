// Toast.js
import React from "react";
import { Animated, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function Toast({ visible, message, type = "error" }) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 2000); // visible for 2 seconds
      });
    }
  }, [visible]);

  if (!visible) return null;

  // Colors based on type
  const bgColor =
    type === "success" ? "#4ade80" : type === "info" ? "#60a5fa" : "#ef4444";

  return (
    <Animated.View
      style={[styles.toast, { opacity: fadeAnim, backgroundColor: bgColor }]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    maxWidth: width - 40,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  message: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
