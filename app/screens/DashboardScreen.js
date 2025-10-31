import React, { useRef, useState, useEffect, useCallback } from "react";
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
  BackHandler,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const numColumns = 2;
const spacing = 16;
const boxSize = (width - spacing * (numColumns + 1)) / numColumns;
const scaleFont = (size) => Math.round((size * width) / 375);

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

  const theme = {
    backgroundGradient: ["#fff9e6", "#fff3b0"],
    gradient: ["#facc15", "#eab308"],
    boxGradient: ["#fde68a", "#fbbf24"],
    text: "#3f3f46",
    subtext: "#737373",
  };

  const socialLinks = [
    { name: "facebook", url: "https://www.facebook.com" ,color:"#3b5998" },
    { name: "instagram", url: "https://www.instagram.com/sssdiit_college" , color:"#C13584"},
    { name: "twitter", url: "https://twitter.com", color:"#1DA1F2" },
    { name: "linkedin", url: "https://www.linkedin.com" , color:"#0077B5" },
    { name: "globe", url: "https://sssdiit.junagadhgurukul.org/", color:"#4CAF50" },
  ];

  const openLink = async (url) => await Linking.openURL(url);

  // 🔁 Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % carouselImages.length;
      setActiveIndex(nextIndex);
      carouselRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }, 3500);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // 🧭 Handle back button (Exit App only when Dashboard focused)
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert("Exit App", "Do you want to exit?", [
          { text: "Cancel", style: "cancel" },
          { text: "Yes", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );

  const onScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setActiveIndex(Math.round(offsetX / width));
  };

  const handleLogout = () => {
    navigation.replace("Login");
  };

  return (
    <LinearGradient colors={theme.backgroundGradient} style={{ flex: 1 }}>
      {/* 🧭 SafeArea removes notch issue */}
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#facc15" />

        {/* 🏫 Header */}
        <LinearGradient colors={theme.gradient} style={styles.header}>
          <View style={styles.headerInnerRow}>
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <Image
                source={require("../assets/gurukul-logo.png")}
                style={styles.logoRow}
                resizeMode="contain"
              />
              <Text style={styles.headerTextRow}>
                Shastri Shree Dharamjivandasji Institute of Technology - 
                Gurukul Junagadh
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Feather name="log-out" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
          {/* 🖼 Carousel */}
          <View style={styles.carouselWrapper}>
            <FlatList
              ref={carouselRef}
              data={carouselImages}
              keyExtractor={(_, i) => i.toString()}
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
                      backgroundColor: "#facc15",
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
              Made with by Vaibhav Pari
            </Text>
            <View style={styles.socialContainer}>
              {socialLinks.map((link) => (
                <TouchableOpacity
                  key={link.name}
                  onPress={() => openLink(link.url)}
                >
                  {link.name === "globe" ? (
                    <Feather name="globe" size={26} color="#eab308" />
                  ) : (
                    <FontAwesome name={link.name} size={26} color={link.color}/>
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
          <Image
            source={box.icon}
            style={styles.iconImage}
            resizeMode="contain"
          />
          <Text style={styles.boxText}>{box.title}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff9e6",
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    elevation: 6,
  },
  headerInnerRow: { flexDirection: "row", alignItems: "center" },
  logoRow: { width: 55, height: 55, marginRight: 10 },
  headerTextRow: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    flexWrap: "wrap",
  },
  logoutButton: { marginLeft: 10 },
  carouselWrapper: { alignItems: "center", marginVertical: 20 },
  carouselCard: {
    width: width * 0.9,
    height: 190,
    borderRadius: 18,
    overflow: "hidden",
    marginHorizontal: width * 0.05,
    elevation: 5,
    backgroundColor: "#fff",
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
    shadowColor: "#fbbf24",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  iconImage: { width: 80, height: 80 },
  boxText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: scaleFont(14),
    color: "#3f3f46",
    marginTop: 10,
  },
  footer: { alignItems: "center", marginTop: 30 },
  footerText: { textAlign: "center", fontSize: 15, letterSpacing: 0.4 },
  socialContainer: { flexDirection: "row", marginTop: 20, gap: 22 },
});
