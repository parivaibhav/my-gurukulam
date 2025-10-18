import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  useColorScheme,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const images = [
  {
    id: "1",
    uri: "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/WhatsApp-Image-2022-06-21-at-2.01.49-PM.jpeg",
  },
  {
    id: "2",
    uri: "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/IMG-20210707-WA0035.jpg",
  },
  {
    id: "3",
    uri: "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/IMG-20210707-WA0035.jpg",
  },
  {
    id: "4",
    uri: "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/IMG-20210707-WA0035.jpg",
  },
  {
    id: "5",
    uri: "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/IMG-20210707-WA0035.jpg",
  },
  {
    id: "6",
    uri: "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/IMG-20210707-WA0035.jpg",
  },
  {
    id: "7",
    uri: "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/IMG-20210707-WA0035.jpg",
  },
  {
    id: "8",
    uri: "https://sssdiit.junagadhgurukul.org/wp-content/uploads/2022/03/IMG-20210707-WA0035.jpg",
  },
];

export default function GalleryScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    bg: isDark ? "#0d0d0d" : "#fafafa",
    text: isDark ? "#ffffff" : "#111111",
    // 🌈 Beautiful gradient header
    headerGradient: isDark ? ["#1a1a1a", "#0d0d0d"] : ["#4c6ef5", "#15aabf"], // Blue to teal gradient
  };

  const handleOpenImage = (uri) => {
    setSelectedImage(uri);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseImage = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setSelectedImage(null));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "light-content"}
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <LinearGradient
        colors={theme.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, Platform.OS === "ios" && styles.headerIOSShadow]}
      >
        <View style={styles.headerLeft}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="image-outline"
              size={22}
              color="#fff"
            />
          </View>
          <Text style={[styles.headerText, { color: "#fff" }]}>Gallery</Text>
        </View>

      </LinearGradient>

      {/* Gallery Grid */}
      <FlatList
        data={images}
        numColumns={2}
        key={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.imageContainer}
            activeOpacity={0.8}
            onPress={() => handleOpenImage(item.uri)}
          >
            <Image
              source={{ uri: item.uri }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />

      {/* Modal Image Viewer */}
      <Modal visible={!!selectedImage} transparent animationType="none">
        <Pressable style={styles.modalOverlay} onPress={handleCloseImage}>
          <Animated.Image
            source={{ uri: selectedImage }}
            style={[
              styles.modalImage,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    }),
                  },
                ],
              },
            ]}
            resizeMode="contain"
          />
          <Animated.View
            style={[styles.closeIconContainer, { opacity: fadeAnim }]}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={38}
              color="#fff"
              onPress={handleCloseImage}
            />
          </Animated.View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === "ios" ? 18 : 14,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
  },
  headerIOSShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconCircle: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 50,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 100,
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: (width - 48) / 2,
    height: (width - 48) / 2,
    borderRadius: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "95%",
    height: "80%",
    borderRadius: 18,
  },
  closeIconContainer: {
    position: "absolute",
    top: 60,
    right: 25,
  },
});
