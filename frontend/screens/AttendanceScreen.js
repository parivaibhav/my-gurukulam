import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ProgressChart } from "react-native-chart-kit";

const { width } = Dimensions.get("window");

// Scale font based on screen width
const scaleFont = (size) => Math.round((size * width) / 375);

export default function AttendanceScreen() {
  const navigation = useNavigation();

  const totalClasses = 40;
  const attended = 35;
  const percentage = (attended / totalClasses) * 100;

  // For chart (value between 0 and 1)
  const data = {
    data: [attended / totalClasses],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          {/* Circular Attendance Chart */}
          <ProgressChart
            data={data}
            width={width * 0.8}
            height={180}
            strokeWidth={12}
            radius={70}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(250, 204, 21, ${opacity})`,
              labelColor: () => "#111827",
            }}
            hideLegend={true}
          />
          <Text style={styles.chartText}>{percentage.toFixed(1)}%</Text>

          {/* Info Section */}
          <Text style={styles.info}>Total Classes: {totalClasses}</Text>
          <Text style={styles.info}>Attended: {attended}</Text>

          <View style={styles.progressBarBackground}>
            <View
              style={[styles.progressBarFill, { width: `${percentage}%` }]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    padding: 8,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: scaleFont(20),
    fontWeight: "700",
    color: "#111827",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  chartText: {
    position: "absolute",
    top: 115,
    fontSize: scaleFont(22),
    fontWeight: "bold",
    color: "#111827",
  },
  info: {
    fontSize: scaleFont(16),
    marginBottom: 10,
    color: "#6b7280",
  },
  progressBarBackground: {
    width: "100%",
    height: 20,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#facc15",
    borderRadius: 10,
  },
});
