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

// Days of the week
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];

// New structured timetable data
const timetable = {
  Monday: [
    {
      type: "lecture",
      subject: "Python",
      time: "08:00 - 08:45",
      room: "A101",
    },
    {
      type: "lecture",
      subject: "ASP.NET",
      time: "08:45 - 09:30",
      room: "B202",
    },
    { type: "break", time: "09:30 - 09:45" },
    {
      type: "lab",
      subject: "Physics Lab",
      time: "09:45 - 11:15",
      room: "Lab 1",
    },
  ],
  Tuesday: [
    {
      type: "lecture",
      subject: "J2EE",
      time: "08:00 - 08:45",
      room: "C301",
    },
    {
      type: "lecture",
      subject: "Python",
      time: "08:45 - 09:30",
      room: "C302",
    },
    { type: "break", time: "09:30 - 09:45" },
    {
      type: "lab",
      subject: "Computer Lab",
      time: "09:45 - 11:15",
      room: "Lab 2",
    },
  ],
  Wednesday: [
    { type: "lecture", subject: "SAD", time: "08:00 - 08:45", room: "D101" },
    { type: "lecture", subject: "DBMS", time: "08:45 - 09:30", room: "D102" },
    { type: "break", time: "09:30 - 09:45" },
    { type: "lab", subject: "DBMS Lab", time: "09:45 - 11:15", room: "Lab 3" },
  ],
  Thursday: [
    { type: "lecture", subject: "ASP.NET", time: "08:00 - 08:45", room: "302" },
    {
      type: "lecture",
      subject: "Operating Systems",
      time: "08:45 - 09:30",
      room: "304",
    },
    { type: "break", time: "09:30 - 09:45" },
    {
      type: "lab",
      subject: "ASP.NET Lab",
      time: "09:45 - 11:15",
      room: "Lab 4",
    },
  ],
  Friday: [
    {
      type: "lecture",
      subject: "Mathematics",
      time: "08:00 - 08:45",
      room: "A201",
    },
    { type: "lecture", subject: "SAD", time: "08:45 - 09:30", room: "A202" },
    { type: "break", time: "09:30 - 09:45" },
    {
      type: "lab",
      subject: "Project Lab",
      time: "09:45 - 11:15",
      room: "Lab 5",
    },
  ],
   Saturday: [
    {
      type: "lecture",
      subject: "Mathematics",
      time: "08:00 - 08:45",
      room: "A201",
    },
    { type: "lecture", subject: "SAD", time: "08:45 - 09:30", room: "A202" },
    { type: "break", time: "09:30 - 09:45" },
    {
      type: "lab",
      subject: "Project Lab",
      time: "09:45 - 11:15",
      room: "Lab 5",
    },
  ],
};

export default function LectureTimetable() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    bg: isDark ? "#0f172a" : "#f9fafb",
    card: isDark ? "#1e293b" : "#ffffff",
    textPrimary: isDark ? "#f1f5f9" : "#111827",
    textSecondary: isDark ? "#94a3b8" : "#6b7280",
    gradient: isDark ? ["#1e3a8a", "#1e40af"] : ["#2563eb", "#1d4ed8"],
    border: isDark ? "#334155" : "#e5e7eb",
    accent: isDark ? "#3b82f6" : "#60a5fa",
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <LinearGradient
        colors={theme.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerText}>Weekly Lecture Timetable</Text>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {days.map((day) => (
          <View
            key={day}
            style={[
              styles.dayContainer,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.dayTitle, { color: theme.textPrimary }]}>
              {day}
            </Text>
            {timetable[day].map((slot, index) => {
              if (slot.type === "break") {
                return (
                  <View
                    key={index}
                    style={[
                      styles.breakRow,
                      { backgroundColor: theme.bg, borderColor: theme.border },
                    ]}
                  >
                    <Text
                      style={[styles.breakText, { color: theme.textSecondary }]}
                    >
                      ☕ Break ({slot.time})
                    </Text>
                  </View>
                );
              }
              return (
                <View
                  key={index}
                  style={[
                    styles.row,
                    {
                      borderColor: theme.border,
                      backgroundColor:
                        slot.type === "lab" ? theme.accent : "transparent",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.subjectText,
                      {
                        color: slot.type === "lab" ? "#fff" : theme.textPrimary,
                      },
                    ]}
                  >
                    {slot.subject}
                  </Text>
                  <Text
                    style={[
                      styles.timeText,
                      {
                        color:
                          slot.type === "lab" ? "#e0f2fe" : theme.textSecondary,
                      },
                    ]}
                  >
                    {slot.time}
                  </Text>
                  <Text
                    style={[
                      styles.roomText,
                      {
                        color:
                          slot.type === "lab" ? "#e0f2fe" : theme.textSecondary,
                      },
                    ]}
                  >
                    {slot.room}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
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
    marginBottom: 12,
  },
  headerText: {
    color: "#fff",
    fontSize: scaleFont(20),
    fontWeight: "700",
  },
  dayContainer: {
    borderWidth: 1,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  dayTitle: {
    fontSize: scaleFont(17),
    fontWeight: "700",
    padding: 10,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  row: {
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  subjectText: {
    fontSize: scaleFont(15),
    fontWeight: "700",
  },
  timeText: {
    fontSize: scaleFont(13),
    fontWeight: "500",
  },
  roomText: {
    fontSize: scaleFont(12),
    fontWeight: "500",
  },
  breakRow: {
    borderTopWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  breakText: {
    fontSize: scaleFont(14),
    fontWeight: "600",
  },
});
