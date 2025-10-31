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
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();

  const theme = {
    bg: isDark ? "#0f172a" : "#fffbea",
    card: isDark ? "#1e293b" : "#fff9db",
    textPrimary: isDark ? "#f1f5f9" : "#111827",
    textSecondary: isDark ? "#94a3b8" : "#6b7280",
    accent: isDark ? "#facc15" : "#fbbf24",
    border: isDark ? "#334155" : "#fcd34d",
  };

  const exams = Object.keys(allResults);
  const [selectedExam, setSelectedExam] = useState(exams[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }) => (
    <LinearGradient
      colors={["#fde68a", "#fcd34d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, { shadowColor: theme.accent }]}
    >
      <View>
        <Text style={[styles.subject, { color: theme.textPrimary }]}>
          {item.subject}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[styles.marks, { color: theme.textPrimary }]}>
            {item.marks} Marks
          </Text>
          <LinearGradient
            colors={["#f59e0b", "#fbbf24"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradeBadge}
          >
            <Text style={styles.gradeText}>{item.grade}</Text>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      {/* Header */}
      <LinearGradient
        colors={["#facc15", "#fbbf24"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Exam Results</Text>
          <View style={{ width: 30 }} />
          {/* Dummy space to balance alignment */}
        </View>
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
            backgroundColor: theme.card,
          },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: theme.textPrimary, fontSize: scaleFont(16) }}>
          {selectedExam}
        </Text>
        <Ionicons name="chevron-down" size={20} color={theme.textSecondary} />
      </TouchableOpacity>

      {/* Modal */}
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
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    elevation: 4,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 6,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 10,
  },
  headerText: {
    color: "#000",
    fontSize: scaleFont(20),
    fontWeight: "700",
  },
  dropdown: {
    margin: 16,
    padding: 14,
    borderWidth: 1.5,
    borderRadius: 14,
    elevation: 3,
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
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  subject: {
    fontSize: scaleFont(16),
    fontWeight: "700",
    marginBottom: 8,
  },
  marks: {
    fontSize: scaleFont(14),
    fontWeight: "600",
  },
  gradeBadge: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  gradeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: scaleFont(14),
  },
});
