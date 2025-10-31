import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

export default function CustomSplash() {
  const [showLoader, setShowLoader] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const iconFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const start = async () => {
      // Stage 1: fade-in logo
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(2000),
      ]).start(() => {
        setShowLoader(true);
        Animated.timing(iconFade, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();

        // Progress animation for remaining time (≈ 17s)
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: 17000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      });
    };

    start();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      {!showLoader ? (
        <>
          <Animated.Image
            source={require("../assets/gurukul-logo.png")}
            style={[
              styles.logo,
              { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
            ]}
          />
          <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
            My Gurukulam
          </Animated.Text>
          <Text style={styles.subtitle}>Empowering Education Digitally</Text>
        </>
      ) : (
        <View style={styles.loaderContainer}>
          <Animated.View style={{ opacity: iconFade }}>
            <MaterialCommunityIcons
              name="book-open-page-variant"
              size={50}
              color="#c47f00"
              style={{ marginBottom: 12 }}
            />
          </Animated.View>

          <Text style={styles.loaderText}>Preparing your experience...</Text>

          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[styles.progressBarFill, { width: progressWidth }]}
            />
          </View>

          <ActivityIndicator
            size="large"
            color="#c47f00"
            style={{ marginTop: 25 }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#c47f00",
    letterSpacing: 0.8,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginTop: 8,
    letterSpacing: 0.5,
  },
  loaderContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loaderText: {
    fontSize: 16,
    color: "#c47f00",
    marginBottom: 20,
    fontWeight: "500",
  },
  progressBarBackground: {
    width: 220,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#f3e2c3",
    overflow: "hidden",
  },
  progressBarFill: {
    height: 8,
    backgroundColor: "#c47f00",
    borderRadius: 10,
  },
});
