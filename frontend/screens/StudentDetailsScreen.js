import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  useColorScheme,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

export default function StudentDetailsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const student = {
    name: "Pari Vaibhavpari B.",
    roll: "12345",
    course: "BCA",
    class: "BCA 5-B",
    email: "vaibhavgoswami055@gmail.com",
    image: require("../assets/profile.jpg"),
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Card */}
        <LinearGradient
          colors={isDark ? ["#1f2937", "#111827"] : ["#2563eb", "#1e3a8a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerCard}
        >
          <Image source={student.image} style={styles.profileImage} />
          <Text style={[styles.name, { color: theme.textPrimary }]}>
            {student.name}
          </Text>
          <Text style={[styles.course, { color: theme.textSecondary }]}>
            {student.class}
          </Text>
        </LinearGradient>

        {/* Info Box */}
        <View
          style={[
            styles.infoBox,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <InfoRow label="Roll No" value={student.roll} theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="Course" value={student.course} theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="Email" value={student.email} theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="Class" value={student.class} theme={theme} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value, theme }) {
  return (
    <View style={styles.infoRow}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>
        {label}
      </Text>
      <Text style={[styles.value, { color: theme.textPrimary }]}>{value}</Text>
    </View>
  );
}

function Divider({ theme }) {
  return <View style={[styles.divider, { backgroundColor: theme.border }]} />;
}

const lightTheme = {
  bg: "#f9fafb",
  textPrimary: "#111827",
  textSecondary: "#6b7280",
  card: "#ffffff",
  border: "#e5e7eb",
};

const darkTheme = {
  bg: "#0f172a",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  card: "#1e293b",
  border: "#334155",
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
  },
  headerCard: {
    width: "100%",
    borderRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 25,
  },
  profileImage: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: (width * 0.35) / 2,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 15,
  },
  name: {
    fontSize: scaleFont(22),
    fontWeight: "700",
    textAlign: "center",
  },
  course: {
    fontSize: scaleFont(15),
    fontWeight: "500",
  },
  infoBox: {
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    fontSize: scaleFont(15),
    fontWeight: "600",
  },
  value: {
    fontSize: scaleFont(15),
    fontWeight: "600",
    textAlign: "right",
    flexShrink: 1,
  },
  divider: {
    height: 1,
    width: "100%",
    opacity: 0.5,
  },
});
