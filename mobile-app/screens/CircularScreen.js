import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  Linking,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

const circulars = [
  {
    id: "1",
    title: "New Exam Schedule Released",
    date: "Oct 7, 2025",
    fileLink: "https://example.com/exam-schedule.pdf",
  },
  {
    id: "2",
    title: "College Fest Registration Open",
    date: "Oct 5, 2025",
    fileLink: "https://example.com/fest-registration.pdf",
  },
  {
    id: "3",
    title: "Library Rules Update",
    date: "Oct 3, 2025",
    fileLink: "https://example.com/library-rules.pdf",
  },
];

export default function CircularScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    bg: isDark ? "#0f172a" : "#f9fafb",
    card: isDark ? "#1e293b" : "#ffffff",
    textPrimary: isDark ? "#f1f5f9" : "#111827",
    textSecondary: isDark ? "#94a3b8" : "#6b7280",
    border: isDark ? "#334155" : "#e5e7eb",
    gradient: isDark ? ["#1e3a8a", "#1e40af"] : ["#2563eb", "#1d4ed8"],
  };

  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <LinearGradient
        colors={theme.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerText}>Circulars</Text>
      </LinearGradient>

      <FlatList
        data={circulars}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <View style={styles.titleRow}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={22}
                color={theme.textPrimary}
              />
              <Text
                style={[styles.title, { color: theme.textPrimary }]}
                numberOfLines={2}
              >
                {item.title}
              </Text>
            </View>

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

            <TouchableOpacity
              style={[styles.downloadBtn, { borderColor: theme.textPrimary }]}
              activeOpacity={0.8}
              onPress={() => openLink(item.fileLink)}
            >
              <MaterialCommunityIcons
                name="download"
                size={18}
                color={theme.textPrimary}
              />
              <Text style={[styles.downloadText, { color: theme.textPrimary }]}>
                View / Download
              </Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 24,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    marginLeft: 10,
    flexShrink: 1,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  date: {
    marginLeft: 6,
    fontSize: scaleFont(13),
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  downloadText: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    marginLeft: 6,
  },
});
