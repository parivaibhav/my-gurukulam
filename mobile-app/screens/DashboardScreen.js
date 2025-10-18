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
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const numColumns = 2;
const spacing = 16;
const boxSize = (width - spacing * (numColumns + 1)) / numColumns;
const scaleFont = (size) => Math.round((size * width) / 375);

// 📦 Menu boxes with 3D icons
const boxes = [
  {
    title: "Student Details",
    screen: "StudentDetails",
    icon: require("../assets/icons3d/profile.png"),
  },
  {
    title: "Assignments",
    screen: "Assignments",
    icon: require("../assets/icons3d/assignments.png"),
  },
  {
    title: "Fees",
    screen: "Fees",
    icon: require("../assets/icons3d/fees.png"),
  },
  {
    title: "Attendance",
    screen: "Attendance",
    icon: require("../assets/icons3d/attendence.png"),
  },
  {
    title: "Blog",
    screen: "Blog",
    icon: require("../assets/icons3d/blog.png"),
  },
  {
    title: "Certificate",
    screen: "BonafideCertificate",
    icon: require("../assets/icons3d/certificate.png"),
  },
  {
    title: "Circular",
    screen: "Circular",
    icon: require("../assets/icons3d/circular.png"),
  },
  {
    title: "Exam",
    screen: "Exam",
    icon: require("../assets/icons3d/exam.png"),
  },
  {
    title: "Time Table",
    screen: "TimeTable",
    icon: require("../assets/icons3d/timetable.png"),
  },
  {
    title: "Gallery",
    screen: "Gallery",
    icon: require("../assets/icons3d/gallery.png"),
  },
  {
    title: "Result",
    screen: "Result",
    icon: require("../assets/icons3d/result.png"),
  },
  {
    title: "Rate App",
    screen: "RateApp",
    icon: require("../assets/icons3d/rate.png"),
  },
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

  // 🎨 Theme system
  const theme = {
    backgroundGradient: isDark
      ? ["#0f172a", "#1e293b"]
      : ["#e0f2fe", "#f9fafb"],
    text: isDark ? "#f1f5f9" : "#111827",
    subtext: isDark ? "#94a3b8" : "#6b7280",
    gradient: isDark ? ["#1e3a8a", "#1e40af"] : ["#2563eb", "#1d4ed8"],
    boxGradient: isDark ? ["#1e3a8a", "#312e81"] : ["#93c5fd", "#2563eb"],
  };

  const socialLinks = [
    { name: "facebook", url: "https://www.facebook.com" },
    { name: "instagram", url: "https://www.instagram.com/sssdiit_college" },
    { name: "twitter", url: "https://twitter.com" },
    { name: "linkedin", url: "https://www.linkedin.com" },
    { name: "globe", url: "https://sssdiit.junagadhgurukul.org/" },
  ];

  const openLink = async (url) => {
    await Linking.openURL(url);
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
    <LinearGradient
      colors={theme.backgroundGradient}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

        {/* 🏫 Header */}
        <LinearGradient
          colors={theme.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerInnerRow}>
            <Image
              source={require("../assets/gurukul-logo.png")}
              style={styles.logoRow}
              resizeMode="contain"
            />
            <Text style={styles.headerTextRow}>
              Shastri Shree Dharamjivandasji Institute of Technology - Gurukul
              Junagadh
            </Text>
          </View>
        </LinearGradient>

        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          {/* 🖼 Carousel */}
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

          {/* 🔹 Grid Menu */}
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

          {/* 🌍 Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.subtext }]}>
              Made with ❤️ by Vaibhav Pari
            </Text>
            <View style={styles.socialContainer}>
              {socialLinks.map((link) => (
                <TouchableOpacity
                  key={link.name}
                  onPress={() => openLink(link.url)}
                  style={styles.socialIcon}
                >
                  {link.name === "globe" ? (
                    <Feather
                      name="globe"
                      size={26}
                      color={isDark ? "#fff" : "#2563eb"}
                    />
                  ) : (
                    <FontAwesome
                      name={link.name}
                      size={26}
                      color={isDark ? "#fff" : "#2563eb"}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

// 🎯 PressableBox component with 3D icon images
function PressableBox({ box, navigation, theme }) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scaleValue, {
      toValue: 0.93,
      useNativeDriver: true,
    }).start();
  const onPressOut = () =>
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

  const handlePress = () => navigation.navigate(box.screen);

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={handlePress}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <LinearGradient
          colors={theme.boxGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.box, { width: boxSize, height: boxSize }]}
        >
          <View >
            <Image
              source={box.icon}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.boxText, { color: "#fff" , marginTop:10 ,fontSize:20 }]}>{box.title}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 0 : 12,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  headerInnerRow: { flexDirection: "row", alignItems: "center" },
  logoRow: { width: 60, height: 60, marginRight: 12 },
  headerTextRow: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    flexWrap: "wrap",
    letterSpacing: 0.5,
  },
  carouselWrapper: { alignItems: "center", marginVertical: 20 },
  carouselCard: {
    width: width * 0.9,
    height: 190,
    borderRadius: 18,
    overflow: "hidden",
    marginHorizontal: width * 0.05,
    elevation: 5,
  },
  carouselImage: { width: "100%", height: "100%" },
  pagination: {
    position: "absolute",
    bottom: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: spacing,
    marginTop: 10,
  },
  box: {
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing * 1.5,
    padding: 15,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
  },
  // iconWrapper: {
  //   width: 68,
  //   height: 68,
  //   borderRadius: 34,
  //   backgroundColor: "rgba(255,255,255,0.15)",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginBottom: 10,
  // },
  iconImage: { width: 90, height: 90 },
  boxText: { fontWeight: "600", textAlign: "center", fontSize: scaleFont(14) },
  footer: { alignItems: "center", marginTop: 30 },
  footerText: { textAlign: "center", fontSize: 15, letterSpacing: 0.4 },
  socialContainer: { flexDirection: "row", marginTop: 20, gap: 12 },
  socialIcon: { marginHorizontal: 6 },
});
