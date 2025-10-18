import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

// Sample results
const allResults = {
  Prelim: [
    { id: "1", subject: "Math", marks: 92, grade: "A+" },
    { id: "2", subject: "Physics", marks: 88, grade: "A" },
  ],
  MidTerm: [
    { id: "1", subject: "Math", marks: 89, grade: "A" },
    { id: "2", subject: "Physics", marks: 84, grade: "A" },
    { id: "3", subject: "Chemistry", marks: 82, grade: "B+" },
  ],

};

export default function ResultScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    bg: isDark ? "#0f172a" : "#f9fafb",
    card: isDark ? "#1e293b" : "#fff",
    textPrimary: isDark ? "#f1f5f9" : "#111827",
    textSecondary: isDark ? "#94a3b8" : "#6b7280",
    active: isDark ? "#10b981" : "#10b981",
    border: isDark ? "#334155" : "#d1d5db",
  };

  const exams = Object.keys(allResults);
  const [selectedExam, setSelectedExam] = useState(exams[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Text style={[styles.subject, { color: theme.textPrimary }]}>
        {item.subject}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[styles.marks, { color: theme.textPrimary }]}>
          {item.marks} Marks
        </Text>
        <LinearGradient
          colors={["#2563eb", "#1d4ed8"]}
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
      <LinearGradient
        colors={["#2563eb", "#1d4ed8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerText}>Exam Results</Text>
      </LinearGradient>

      {/* Dropdown */}
      <TouchableOpacity
        style={[
          styles.dropdown,
          {
            borderColor: theme.border,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: theme.textPrimary, fontSize: scaleFont(16) }}>
          {selectedExam}
        </Text>
        <Ionicons name="chevron-down" size={20} color={theme.textSecondary} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            {exams.map((exam) => (
              <TouchableOpacity
                key={exam}
                style={styles.modalItem}
                onPress={() => {
                  setSelectedExam(exam);
                  setModalVisible(false);
                }}
              >
                <Text
                  style={{ color: theme.textPrimary, fontSize: scaleFont(16) }}
                >
                  {exam}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Results List */}
      <FlatList
        data={allResults[selectedExam]}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20 }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    paddingVertical: 20,
    alignItems: "center",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  headerText: { color: "#fff", fontSize: scaleFont(22), fontWeight: "700" },
  dropdown: {
    margin: 16,
    padding: 14,
    borderWidth: 1,
    borderRadius: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "70%",
    borderRadius: 12,
    paddingVertical: 12,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  subject: { fontSize: scaleFont(16), fontWeight: "700", marginBottom: 6 },
  marks: { fontSize: scaleFont(14), fontWeight: "600" },
  gradeBadge: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6 },
  gradeText: { color: "#fff", fontWeight: "700", fontSize: scaleFont(14) },
});
