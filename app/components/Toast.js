import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet, Dimensions, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Toast({ visible, message, type = "error" }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (visible) {
      // Slide & fade in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Auto fade & slide out after 2.5 sec
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
              toValue: 30,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start();
        }, 2500);
      });
    }
  }, [visible]);

  if (!visible) return null;

  // Toast colors & icons
  const toastStyles = {
    success: { bg: "rgba(34,197,94,0.95)", icon: "check-circle" }, // green
    info: { bg: "rgba(59,130,246,0.95)", icon: "info" }, // blue
    error: { bg: "rgba(239,68,68,0.95)", icon: "error" }, // red
  };

  const { bg, icon } = toastStyles[type] || toastStyles.error;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          backgroundColor: bg,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} size={22} color="#fff" />
      </View>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 30,
    maxWidth: width * 0.9,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  iconContainer: {
    marginRight: 10,
  },
  message: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    flexShrink: 1,
  },
});
