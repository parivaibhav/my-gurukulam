import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressChart } from "react-native-chart-kit";
import { Calendar } from "react-native-calendars";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

export default function AttendanceScreen() {
  const navigation = useNavigation();

  const totalClasses = 40;
  const attended = 35;
  const [percentage, setPercentage] = useState(0);
  const animatedValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: attended / totalClasses,
      duration: 1200,
      useNativeDriver: false,
    }).start();

    animatedValue.addListener(({ value }) => {
      setPercentage(value * 100);
    });
  }, []);

  const attendanceMarked = {
    "2025-10-01": { marked: true, dotColor: "#22c55e" },
    "2025-10-02": { marked: true, dotColor: "#22c55e" },
    "2025-10-03": { marked: true, dotColor: "#ef4444" },
    "2025-10-04": { marked: true, dotColor: "#22c55e" },
    "2025-10-05": { marked: true, dotColor: "#22c55e" },
    "2025-10-06": { marked: true, dotColor: "#ef4444" },
    "2025-10-07": { marked: true, dotColor: "#22c55e" },
  };

  const [viewMode, setViewMode] = useState("week");

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 🔝 Gradient Top Bar */}
      <LinearGradient
        colors={["#facc15", "#f59e0b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.topBar}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={22} color="#1f2937" />
        </TouchableOpacity>

        <Text style={styles.topTitle}>Attendance</Text>

        <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
          <Ionicons name="time-outline" size={22} color="#1f2937" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* 📊 Animated Attendance Chart */}
        <View style={styles.card}>
          <Text style={styles.title}>Overall Attendance</Text>

          <ProgressChart
            data={{ data: [percentage / 100] }}
            width={width * 0.75}
            height={180}
            strokeWidth={14}
            radius={70}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(234, 179, 8, ${opacity})`,
              labelColor: () => "#1f2937",
            }}
            hideLegend
          />

          <Animated.Text style={styles.percentage}>
            {percentage.toFixed(1)}%
          </Animated.Text>
          <Text style={styles.info}>
            Total: {totalClasses} | Attended: {attended}
          </Text>
        </View>

        {/* 🗓 Monthly Calendar */}
        <View style={styles.card}>
          <Text style={styles.title}>Monthly Attendance</Text>
          <Calendar
            markingType="dot"
            markedDates={attendanceMarked}
            theme={{
              todayTextColor: "#eab308",
              dayTextColor: "#1f2937",
              monthTextColor: "#1f2937",
              arrowColor: "#eab308",
              textDayFontFamily: Platform.OS === "ios" ? "Helvetica" : "Roboto",
            }}
          />
        </View>

        {/* 🔁 Toggle View */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === "week" && styles.activeToggle,
            ]}
            onPress={() => setViewMode("week")}
            activeOpacity={0.8}
          >
            <Ionicons
              name="calendar-outline"
              size={18}
              color={viewMode === "week" ? "#fff" : "#78350f"}
            />
            <Text
              style={[
                styles.toggleText,
                viewMode === "week" && { color: "#fff" },
              ]}
            >
              Week
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === "month" && styles.activeToggle,
            ]}
            onPress={() => setViewMode("month")}
            activeOpacity={0.8}
          >
            <Ionicons
              name="calendar"
              size={18}
              color={viewMode === "month" ? "#fff" : "#78350f"}
            />
            <Text
              style={[
                styles.toggleText,
                viewMode === "month" && { color: "#fff" },
              ]}
            >
              Month
            </Text>
          </TouchableOpacity>
        </View>

        {/* 📅 Attendance Table */}
        <View style={styles.card}>
          <Text style={styles.title}>
            {viewMode === "week" ? "Weekly" : "Monthly"} Attendance
          </Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, { flex: 2 }]}>Date</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Status</Text>
          </View>
          {Object.keys(attendanceMarked)
            .slice(0, viewMode === "week" ? 7 : 30)
            .map((date) => {
              const isPresent = attendanceMarked[date].dotColor === "#22c55e";
              return (
                <View style={styles.tableRow} key={date}>
                  <Text style={[styles.tableCell, { flex: 2 }]}>{date}</Text>
                  <View
                    style={[
                      styles.statusContainer,
                      { backgroundColor: isPresent ? "#fef9c3" : "#fee2e2" },
                    ]}
                  >
                    <MaterialIcons
                      name={isPresent ? "check-circle" : "cancel"}
                      size={20}
                      color={isPresent ? "#65a30d" : "#dc2626"}
                    />
                    <Text
                      style={{
                        marginLeft: 6,
                        color: isPresent ? "#365314" : "#991b1b",
                        fontWeight: "600",
                      }}
                    >
                      {isPresent ? "Present" : "Absent"}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ✨ STYLES (Production Level) */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fffbea",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    elevation: 8,
    shadowColor: "#facc15",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
  },
  topTitle: {
    fontSize: scaleFont(18),
    fontWeight: "700",
    color: "#1f2937",
  },
  container: {
    padding: 16,
    alignItems: "center",
    paddingBottom: 50,
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#fde68a",
    shadowColor: "#facc15",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: scaleFont(17),
    fontWeight: "700",
    color: "#78350f",
    marginBottom: 12,
  },
  percentage: {
    fontSize: scaleFont(26),
    fontWeight: "bold",
    textAlign: "center",
    color: "#ca8a04",
    marginTop: 6,
  },
  info: {
    fontSize: scaleFont(14),
    textAlign: "center",
    color: "#6b7280",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#fde68a",
    paddingBottom: 6,
    marginBottom: 6,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  tableCell: {
    fontSize: scaleFont(14),
    color: "#1f2937",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    marginVertical: 12,
    backgroundColor: "#fef9c3",
    borderRadius: 14,
    overflow: "hidden",
    width: "90%",
  },
  toggleButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
  },
  activeToggle: {
    backgroundColor: "#facc15",
  },
  toggleText: {
    fontWeight: "600",
    color: "#78350f",
  },
});
