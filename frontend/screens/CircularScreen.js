import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  useColorScheme,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

// Sample circulars data
const circulars = [
  {
    id: "1",
    title: "New Exam Schedule Released",
    date: "Oct 7, 2025",
    image: {
      uri: "https://images.unsplash.com/photo-1604537529428-97a5a9d3d214?w=600",
    },
    link: "https://example.com/exam-schedule",
  },
  {
    id: "2",
    title: "College Fest Registration Open",
    date: "Oct 5, 2025",
    image: {
      uri: "https://images.unsplash.com/photo-1596496055587-08b6e8c144f7?w=600",
    },
    link: "https://example.com/fest-registration",
  },
  {
    id: "3",
    title: "Library Rules Update",
    date: "Oct 3, 2025",
    image: {
      uri: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
    },
    link: "https://example.com/library-rules",
  },
];

export default function CircularScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    bg: isDark ? "#0f172a" : "#f9fafb",
    card: isDark ? "#1e293b" : "#fff",
    textPrimary: isDark ? "#f1f5f9" : "#111827",
    textSecondary: isDark ? "#94a3b8" : "#6b7280",
    gradient: isDark ? ["#1e3a8a", "#1e40af"] : ["#2563eb", "#1d4ed8"],
  };

  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      {/* Header */}
      <LinearGradient
        colors={theme.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={[styles.headerText]}>Circulars</Text>
      </LinearGradient>

      {/* Circular List */}
      <FlatList
        data={circulars}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.card, { backgroundColor: theme.card }]}
            onPress={() => openLink(item.link)}
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={[styles.title, { color: theme.textPrimary }]}>
                {item.title}
              </Text>
              <View style={styles.metaRow}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={16}
                  color={theme.textSecondary}
                />
                <Text style={[styles.date, { color: theme.textSecondary }]}>
                  {item.date}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingVertical: 18,
    alignItems: "center",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    marginBottom: 12,
  },
  headerText: {
    fontSize: scaleFont(22),
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
  },
  cardContent: {
    padding: 12,
  },
  title: {
    fontSize: scaleFont(16),
    fontWeight: "700",
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    marginLeft: 6,
    fontSize: scaleFont(13),
  },
});
