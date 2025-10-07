import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  Pressable,
  ScrollView,
  Platform,
  StatusBar,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const numColumns = 2;
const spacing = 18;
const boxSize = (width - spacing * (numColumns + 1)) / numColumns;
const scaleFont = (size) => Math.round((size * width) / 375);

const boxes = [
  { title: "Student Details", screen: "StudentDetails", icon: "account-school" },
  { title: "Assignments", screen: "Assignments", icon: "book-open-variant" },
  { title: "Fees", screen: "Fees", icon: "wallet-outline" },
  { title: "Attendance", screen: "Attendance", icon: "calendar-check-outline" },
  { title: "Blog", screen: "Blog", icon: "newspaper-variant-outline" },
  { title: "Certificate", screen: "BonafideCertificate", icon: "certificate-outline" },
  { title: "Exam", screen: "Exam", icon: "clipboard-text-outline" },
  { title: "Circular", screen: "Circular", icon: "bell-outline" },
  { title: "Result", screen: "Result", icon: "trophy-outline" },
  { title: "Rate App", screen: "RateApp", icon: "star-outline" },
];

const carouselImages = [
  require("../assets/slide1.jpeg"),
  require("../assets/slide2.jpeg"),
  require("../assets/slide3.jpeg"),
];

export default function Dashboard({ navigation }) {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    background: isDark ? "#0f172a" : "#f9fafb",
    text: isDark ? "#f1f5f9" : "#111827",
    subtext: isDark ? "#94a3b8" : "#6b7280",
    box: isDark ? "#1e293b" : "#ffffff",
    gradient: isDark ? ["#1e3a8a", "#1e40af"] : ["#2563eb", "#1d4ed8"],
    iconGradient: isDark ? ["#3b82f6", "#1e40af"] : ["#60a5fa", "#2563eb"],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % carouselImages.length;
      setActiveIndex(nextIndex);
      carouselRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }, 3500);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const onScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      {/* Modern Compact Gradient Header */}
      <LinearGradient
        colors={theme.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerInner}>
          <Image
            source={require("../assets/gurukul-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerText}>SSSDIIT Gurukul</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {/* Image Carousel */}
        <View style={styles.carouselWrapper}>
          <FlatList
            ref={carouselRef}
            data={carouselImages}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            renderItem={({ item }) => (
              <View style={styles.carouselCard}>
                <Image source={item} style={styles.carouselImage} />
              </View>
            )}
          />
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {carouselImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    opacity: index === activeIndex ? 1 : 0.3,
                    backgroundColor: isDark ? "#fff" : "#2563eb",
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Grid Menu */}
        <View style={styles.gridContainer}>
          {boxes.map((box) => (
            <PressableBox
              key={box.title}
              box={box}
              navigation={navigation}
              theme={theme}
            />
          ))}
        </View>

        <Text style={[styles.footerText, { color: theme.subtext }]}>
          Made with 💙 by Vaibhav
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function PressableBox({ box, navigation, theme }) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.94,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => navigation.navigate(box.screen);

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={handlePress}>
      <Animated.View
        style={[
          styles.box,
          {
            width: boxSize,
            height: boxSize,
            backgroundColor: theme.box,
            shadowColor: theme.text,
            transform: [{ scale: scaleValue }],
          },
        ]}
      >
        <LinearGradient
          colors={theme.iconGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconGradient}
        >
          <MaterialCommunityIcons name={box.icon} size={36} color="#fff" />
        </LinearGradient>
        <Text style={[styles.boxText, { color: theme.text }]}>{box.title}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  headerInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: { width: 42, height: 42, marginRight: 10 },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.6,
  },

  carouselWrapper: { alignItems: "center", marginVertical: 15 },
  carouselCard: {
    width: width * 0.9,
    height: 160,
    borderRadius: 14,
    overflow: "hidden",
    marginHorizontal: width * 0.05,
    elevation: 4,
  },
  carouselImage: { width: "100%", height: "100%" },
  pagination: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingHorizontal: spacing,
    marginTop: 10,
  },
  box: {
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing * 1.5,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    padding: 15,
  },
  iconGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  boxText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: scaleFont(13.5),
  },
  footerText: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 15,
    letterSpacing: 0.4,
  },
});
