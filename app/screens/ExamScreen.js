import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

// Exam data
const exams = [
  { day: "Monday", start: "10:00", end: "12:00", subject: "Mathematics" },
  { day: "Monday", start: "13:00", end: "14:00", subject: "English" },
  { day: "Tuesday", start: "09:00", end: "11:00", subject: "Physics" },
  { day: "Wednesday", start: "11:00", end: "12:00", subject: "Chemistry" },
  {
    day: "Thursday",
    start: "08:00",
    end: "10:00",
    subject: "Computer Science",
  },
  { day: "Friday", start: "14:00", end: "16:00", subject: "Biology" },
];

const cellWidth = 120;
const rowHeight = 60;

export default function ExamScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    bg: isDark ? "#0f172a" : "#f9fafb",
    card: isDark ? "#1e293b" : "#ffffff",
    textPrimary: isDark ? "#f1f5f9" : "#111827",
    textSecondary: isDark ? "#94a3b8" : "#6b7280",
    gradient: isDark ? ["#1e3a8a", "#1e40af"] : ["#2563eb", "#1d4ed8"],
    accent: isDark ? "#3b82f6" : "#60a5fa",
    border: isDark ? "#334155" : "#e5e7eb",
  };

  // Generate grid cells
  const renderGrid = () => {
    return timeSlots.map((time, rowIndex) => (
      <View
        key={time}
        style={[
          styles.row,
          { borderBottomColor: theme.border, height: rowHeight },
        ]}
      >
        <View
          style={[
            styles.timeCell,
            { borderRightColor: theme.border, height: rowHeight },
          ]}
        >
          <Text style={[styles.timeText, { color: theme.textSecondary }]}>
            {time}
          </Text>
        </View>
        {days.map((day) => {
          const exam = exams.find((e) => e.day === day && e.start === time);
          return (
            <View
              key={day + rowIndex}
              style={[
                styles.dayCell,
                { borderRightColor: theme.border, height: rowHeight },
              ]}
            >
              {exam && (
                <View
                  style={[
                    styles.examCard,
                    {
                      height:
                        rowHeight * (timeSlots.indexOf(exam.end) - rowIndex),
                      backgroundColor: theme.accent,
                    },
                  ]}
                >
                  <Text style={[styles.subjectText]}>{exam.subject}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    ));
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
        <Text style={styles.headerText}>College Exam Timetable</Text>
      </LinearGradient>

      <ScrollView horizontal contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={{ flexDirection: "column" }}>
          {/* Days header */}
          <View style={[styles.row, { backgroundColor: theme.card }]}>
            <View style={[styles.timeCell, { borderRightColor: theme.border }]}>
              <Text style={[styles.timeText, { color: theme.textPrimary }]}>
                Time
              </Text>
            </View>
            {days.map((day) => (
              <View
                key={day}
                style={[styles.dayCell, { borderRightColor: theme.border }]}
              >
                <Text style={[styles.dayText, { color: theme.textPrimary }]}>
                  {day}
                </Text>
              </View>
            ))}
          </View>

          {/* Grid */}
          <ScrollView style={{ maxHeight: 600 }}>{renderGrid()}</ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    paddingVertical: 14,
    alignItems: "center",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 16,
  },
  headerText: {
    color: "#fff",
    fontSize: scaleFont(20),
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  timeCell: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    paddingVertical: 10,
  },
  dayCell: {
    width: cellWidth,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    paddingVertical: 10,
  },
  timeText: {
    fontSize: scaleFont(13),
    fontWeight: "600",
  },
  dayText: {
    fontSize: scaleFont(14),
    fontWeight: "700",
  },
  examCard: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  subjectText: {
    fontSize: scaleFont(13),
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
});
