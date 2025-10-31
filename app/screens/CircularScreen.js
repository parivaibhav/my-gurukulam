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
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();
  const isDark = colorScheme === "dark";

  const theme = {
    bg: isDark ? "#0f172a" : "#fffbea",
    card: isDark ? "#1e293b" : "#ffffff",
    textPrimary: isDark ? "#f8fafc" : "#1f2937",
    textSecondary: isDark ? "#94a3b8" : "#6b7280",
    border: isDark ? "#334155" : "#facc15",
    gradient: isDark ? ["#78350f", "#451a03"] : ["#facc15", "#f59e0b"],
    button: isDark ? "#facc15" : "#fbbf24",
  };

  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const renderCircular = ({ item }) => (
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
        style={[styles.downloadBtn, { backgroundColor: theme.button }]}
        activeOpacity={0.85}
        onPress={() => openLink(item.fileLink)}
      >
        <MaterialCommunityIcons name="download" size={18} color="#1f2937" />
        <Text style={[styles.downloadText]}>View / Download</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      {/* 🔝 Top Bar */}
      <LinearGradient
        colors={theme.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Circulars</Text>
        <View style={{ width: 22 }} /> {/* spacer for symmetry */}
      </LinearGradient>

      {/* 🗂️ Circulars List */}
      <FlatList
        data={circulars}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={renderCircular}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 18 : 14,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    elevation: 4,
    shadowColor: "#facc15",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  backButton: {
    padding: 4,
    borderRadius: 8,
  },
  headerText: {
    fontSize: scaleFont(20),
    fontWeight: "700",
    color: "#1f2937",
    letterSpacing: 0.5,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 8,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#facc15",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
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
  },
  downloadText: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    marginLeft: 6,
    color: "#1f2937",
  },
});
