import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

// Sample results data
const results = [
  { id: "1", subject: "Mathematics", marks: 92, grade: "A+" },
  { id: "2", subject: "Physics", marks: 88, grade: "A" },
  { id: "3", subject: "Chemistry", marks: 85, grade: "A" },
  { id: "4", subject: "Computer Science", marks: 95, grade: "A+" },
  { id: "5", subject: "English", marks: 90, grade: "A+" },
];

export default function ResultScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    bg: isDark ? "#0f172a" : "#f9fafb",
    card: isDark ? "#1e293b" : "#ffffff",
    textPrimary: isDark ? "#f1f5f9" : "#111827",
    textSecondary: isDark ? "#94a3b8" : "#6b7280",
    gradient: isDark ? ["#1e3a8a", "#1e40af"] : ["#2563eb", "#1d4ed8"],
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Text style={[styles.subject, { color: theme.textPrimary }]}>{item.subject}</Text>
      <View style={styles.resultRow}>
        <Text style={[styles.marks, { color: theme.textPrimary }]}>Marks: {item.marks}</Text>
        <LinearGradient
          colors={theme.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradeBadge}
        >
          <Text style={styles.gradeText}>{item.grade}</Text>
        </LinearGradient>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      {/* Header */}
      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
        <Text style={styles.headerText}>Exam Results</Text>
      </LinearGradient>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  subject: {
    fontSize: scaleFont(16),
    fontWeight: "700",
    marginBottom: 8,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  marks: {
    fontSize: scaleFont(14),
    fontWeight: "600",
  },
  gradeBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  gradeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: scaleFont(14),
  },
});
