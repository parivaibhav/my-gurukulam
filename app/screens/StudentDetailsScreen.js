import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

export default function StudentDetailsScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? darkTheme : lightTheme;

  const student = {
    name: "Pari Vaibhavpari B.",
    roll: "12345",
    course: "BCA",
    class: "BCA 5-B",
    email: "vaibhavgoswami055@gmail.com",
    fatherName: "Mr. Bhavesh Goswami",
    mobile: "9876543210",
    smsNumber: "9876543210",
    grNumber: "GR12345",
    district: "Surat",
    taluka: "Kamrej",
    village: "Laskana",
    aadhar: "1234 5678 9012",
    dob: "10 March 2004",
    abcId: "ABC2025VA123",
    enrollment: "UNI-2025-00123",
    image: require("../assets/profile.jpg"),
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      {/* 🌟 Modern Top Bar */}
      <LinearGradient
        colors={isDark ? ["#facc15", "#a16207"] : ["#fde047", "#f59e0b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.topBarModern}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={26} color="#1c1917" />
        </TouchableOpacity>

        <Text style={styles.topBarTitle}>Student Details</Text>

        {/* Placeholder for spacing symmetry */}
        <View style={{ width: 26 }} />
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 🪄 Header Card */}
        <LinearGradient
          colors={isDark ? ["#facc15", "#92400e"] : ["#fde047", "#f59e0b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerCard}
        >
          <Image source={student.image} style={styles.profileImage} />
          <Text style={[styles.name, { color: "#1f2937" }]}>
            {student.name}
          </Text>
          <Text style={[styles.course, { color: "#4b5563" }]}>
            {student.class}
          </Text>
        </LinearGradient>

        {/* 📋 Info Box */}
        <View
          style={[
            styles.infoBox,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              shadowColor: theme.shadow,
            },
          ]}
        >
          <InfoRow label="ABC ID" value={student.abcId} theme={theme} />
          <Divider theme={theme} />
          <InfoRow
            label="Father Name"
            value={student.fatherName}
            theme={theme}
          />
          <Divider theme={theme} />
          <InfoRow label="Mobile No" value={student.mobile} theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="SMS No" value={student.smsNumber} theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="GR No" value={student.grNumber} theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="District" value={student.district} theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="Taluka" value={student.taluka} theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="Village" value={student.village} theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="Aadhar No" value={student.aadhar} theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="Date of Birth" value={student.dob} theme={theme} />
          <Divider theme={theme} />
          <InfoRow
            label="Enrollment No"
            value={student.enrollment}
            theme={theme}
          />
          <Divider theme={theme} />
          <InfoRow label="Roll No" value={student.roll} theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="Course" value={student.course} theme={theme} />
          <Divider theme={theme} />
          <InfoRow label="Email" value={student.email} theme={theme} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* 🧱 Reusable Components */
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

/* 🎨 THEMES */
const lightTheme = {
  bg: "#fffbea",
  textPrimary: "#1c1917",
  textSecondary: "#78350f",
  card: "#ffffff",
  border: "#fde68a",
  shadow: "#facc15",
};

const darkTheme = {
  bg: "#18181b",
  textPrimary: "#fef9c3",
  textSecondary: "#facc15",
  card: "#27272a",
  border: "#44403c",
  shadow: "#facc15",
};

/* 💅 STYLES */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  /* 🔝 Modern Top Bar */
  topBarModern: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    elevation: 8,
    shadowColor: "#facc15",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  backButton: {
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 10,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  topBarTitle: {
    fontSize: scaleFont(18),
    fontWeight: "700",
    color: "#1c1917",
    textAlign: "center",
  },

  scrollContainer: {
    padding: 20,
    alignItems: "center",
    paddingBottom: 60,
  },

  /* 🪄 Header Card */
  headerCard: {
    width: "100%",
    borderRadius: 25,
    paddingVertical: 35,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 25,
    shadowColor: "#facc15",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
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

  /* 📋 Info Box */
  infoBox: {
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 30,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },

  label: {
    fontSize: scaleFont(14),
    fontWeight: "600",
  },

  value: {
    fontSize: scaleFont(14),
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
