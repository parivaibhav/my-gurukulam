import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  useColorScheme,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const timetable = {
  Monday: [
    { type: "lecture", subject: "Python", time: "08:00 - 08:45", room: "A101" },
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
    { type: "lecture", subject: "J2EE", time: "08:00 - 08:45", room: "C301" },
    { type: "lecture", subject: "Python", time: "08:45 - 09:30", room: "C302" },
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
  const navigation = useNavigation();
  const isDark = colorScheme === "dark";

  const theme = {
    bg: isDark ? "#0f172a" : "#fffbea",
    card: isDark ? "#1e293b" : "#ffffff",
    textPrimary: isDark ? "#f8fafc" : "#1f2937",
    textSecondary: isDark ? "#94a3b8" : "#4b5563",
    border: isDark ? "#334155" : "#facc15",
    gradient: isDark ? ["#78350f", "#451a03"] : ["#facc15", "#f59e0b"],
    accent: isDark ? "#facc15" : "#fbbf24",
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color="#1f2937" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Lecture Timetable</Text>
        <View style={{ width: 22 }} />
      </LinearGradient>

      {/* Table */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {days.map((day) => (
          <View
            key={day}
            style={[
              styles.dayContainer,
              { borderColor: theme.border, backgroundColor: theme.card },
            ]}
          >
            <Text
              style={[
                styles.dayTitle,
                { backgroundColor: theme.accent, color: "#1f2937" },
              ]}
            >
              {day}
            </Text>

            {/* Table Header */}
            <View style={[styles.tableHeader, { borderColor: theme.border }]}>
              <Text style={[styles.tableHeadText, { flex: 1.2 }]}>Subject</Text>
              <Text style={[styles.tableHeadText, { flex: 1 }]}>Time</Text>
              <Text style={[styles.tableHeadText, { flex: 0.8 }]}>Room</Text>
            </View>

            {timetable[day].map((slot, index) =>
              slot.type === "break" ? (
                <View
                  key={index}
                  style={[
                    styles.breakRow,
                    { borderColor: theme.border, backgroundColor: "#fef3c7" },
                  ]}
                >
                  <Text style={[styles.breakText, { color: "#92400e" }]}>
                    Break ({slot.time})
                  </Text>
                </View>
              ) : (
                <View
                  key={index}
                  style={[
                    styles.tableRow,
                    {
                      borderColor: theme.border,
                      backgroundColor:
                        slot.type === "lab" ? "#fef9c3" : "transparent",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.cellText,
                      {
                        flex: 1.2,
                        color: theme.textPrimary,
                        fontWeight: "600",
                      },
                    ]}
                  >
                    {slot.subject}
                  </Text>
                  <Text
                    style={[
                      styles.cellText,
                      { flex: 1, color: theme.textSecondary },
                    ]}
                  >
                    {slot.time}
                  </Text>
                  <Text
                    style={[
                      styles.cellText,
                      { flex: 0.8, color: theme.textSecondary },
                    ]}
                  >
                    {slot.room}
                  </Text>
                </View>
              )
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 16 : 12,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    elevation: 4,
  },
  backButton: {
    padding: 4,
    borderRadius: 8,
  },
  headerText: {
    fontSize: scaleFont(20),
    fontWeight: "700",
    color: "#1f2937",
  },
  dayContainer: {
    borderWidth: 1,
    marginHorizontal: 14,
    marginVertical: 10,
    borderRadius: 14,
    overflow: "hidden",
    elevation: 2,
  },
  dayTitle: {
    fontSize: scaleFont(17),
    fontWeight: "700",
    paddingVertical: 10,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 8,
    backgroundColor: "#fde68a",
  },
  tableHeadText: {
    textAlign: "center",
    fontWeight: "700",
    color: "#78350f",
    fontSize: scaleFont(13),
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
  },
  cellText: {
    textAlign: "center",
    fontSize: scaleFont(13),
  },
  breakRow: {
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  breakText: {
    fontSize: scaleFont(14),
    fontWeight: "600",
  },
});
