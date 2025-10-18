import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressChart } from "react-native-chart-kit";
import { Calendar } from "react-native-calendars";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

export default function AttendanceScreen() {
  const totalClasses = 40;
  const attended = 35;
  const [percentage, setPercentage] = useState(0);

  // Animate percentage
  const animatedValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: (attended / totalClasses),
      duration: 1000,
      useNativeDriver: false,
    }).start();

    animatedValue.addListener(({ value }) => {
      setPercentage(value * 100);
    });
  }, []);

  // Calendar data
  const attendanceMarked = {
    "2025-10-01": { marked: true, dotColor: "green" },
    "2025-10-02": { marked: true, dotColor: "green" },
    "2025-10-03": { marked: true, dotColor: "red" },
    "2025-10-04": { marked: true, dotColor: "green" },
    "2025-10-05": { marked: true, dotColor: "green" },
    "2025-10-06": { marked: true, dotColor: "red" },
    "2025-10-07": { marked: true, dotColor: "green" },
  };

  // Table view toggle
  const [viewMode, setViewMode] = useState("week"); // "week" or "month"

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Animated Circular Chart */}
        <View style={styles.card}>
          <Text style={styles.title}>Overall Attendance</Text>
          <ProgressChart
            data={{ data: [percentage / 100] }}
            width={width * 0.75}
            height={180}
            strokeWidth={14}
            radius={70}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
              labelColor: () => "#111827",
            }}
            hideLegend={true}
          />
          <Text style={styles.percentage}>{percentage.toFixed(1)}%</Text>
          <Text style={styles.info}>
            Total: {totalClasses} | Attended: {attended}
          </Text>
        </View>

        {/* Calendar */}
        <View style={styles.card}>
          <Text style={styles.title}>Monthly Attendance</Text>
          <Calendar
            markingType="dot"
            markedDates={attendanceMarked}
            theme={{
              todayTextColor: "#f59e0b",
              dayTextColor: "#111827",
              monthTextColor: "#111827",
              arrowColor: "#f59e0b",
            }}
          />
        </View>

        {/* Table Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === "week" && styles.activeToggle,
            ]}
            onPress={() => setViewMode("week")}
          >
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
          >
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

        {/* Attendance Table */}
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
              const isPresent = attendanceMarked[date].dotColor === "green";
              return (
                <View style={styles.tableRow} key={date}>
                  <Text style={[styles.tableCell, { flex: 2 }]}>{date}</Text>
                  <View
                    style={[
                      styles.statusContainer,
                      { backgroundColor: isPresent ? "#d1fae5" : "#fee2e2" },
                    ]}
                  >
                    <MaterialIcons
                      name={isPresent ? "check-circle" : "cancel"}
                      size={20}
                      color={isPresent ? "#10b981" : "#ef4444"}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        color: isPresent ? "#065f46" : "#b91c1c",
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    padding: 15,
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: "700",
    marginBottom: 10,
    color: "#111827",
  },
  percentage: {
    fontSize: scaleFont(22),
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
    color: "#10b981",
  },
  info: {
    fontSize: scaleFont(14),
    textAlign: "center",
    color: "#6b7280",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 8,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    alignItems: "center",
  },
  tableCell: {
    fontSize: scaleFont(14),
    color: "#111827",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 12,
  },
  activeToggle: {
    backgroundColor: "#10b981",
  },
  toggleText: {
    fontWeight: "600",
    color: "#111827",
  },
});
