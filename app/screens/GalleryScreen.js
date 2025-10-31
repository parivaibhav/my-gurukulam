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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

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
];

export default function GalleryScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const isDark = colorScheme === "dark";

  const theme = {
    bg: isDark ? "#0d0d0d" : "#fffbea",
    text: isDark ? "#fff" : "#1f2937",
    headerGradient: isDark ? ["#78350f", "#451a03"] : ["#facc15", "#f59e0b"],
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
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* 🔝 Top Bar with Title */}
      <LinearGradient
        colors={theme.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, Platform.OS === "ios" && styles.headerIOSShadow]}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={22} color="#1f2937" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Gallery</Text>

        <View style={styles.iconButton}>
          <MaterialCommunityIcons
            name="image-outline"
            size={22}
            color="#1f2937"
          />
        </View>
      </LinearGradient>

      {/* 🖼️ Gallery Grid */}
      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={(item) => item.id}
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

      {/* 🪟 Modal Image Viewer */}
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
            <Ionicons
              name="close-circle"
              size={40}
              color="#facc15"
              onPress={handleCloseImage}
            />
          </Animated.View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

/* ✨ Styles */
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 16 : 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
    shadowColor: "#facc15",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  headerIOSShadow: {
    shadowColor: "#facc15",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  iconButton: {
    padding: 6,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    letterSpacing: 0.3,
  },
  grid: {
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 100,
  },
  imageContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#facc15",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
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
    width: "90%",
    height: "80%",
    borderRadius: 18,
  },
  closeIconContainer: {
    position: "absolute",
    top: 60,
    right: 25,
  },
});
