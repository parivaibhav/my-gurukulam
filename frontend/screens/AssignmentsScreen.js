import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

// Sample assignments with progress & due dates
const assignmentsData = [
  {
    id: "1",
    subject: "Mathematics",
    due: "2025-10-12",
    progress: 0.75,
    icon: "calculator-variant",
  },
  {
    id: "2",
    subject: "Physics",
    due: "2025-10-15",
    progress: 0.45,
    icon: "atom",
  },
  {
    id: "3",
    subject: "Chemistry",
    due: "2025-10-20",
    progress: 0.2,
    icon: "flask-outline",
  },
  {
    id: "4",
    subject: "English",
    due: "2025-10-22",
    progress: 0.9,
    icon: "book-open-variant",
  },
  {
    id: "5",
    subject: "Computer Science",
    due: "2025-10-25",
    progress: 0.6,
    icon: "laptop",
  },
];

export default function AssignmentsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [assignments, setAssignments] = useState(assignmentsData);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false, // 👈 FIX: width animation needs JS thread
    }).start();
  }, []);

  // Filter logic
  useEffect(() => {
    const filtered = assignmentsData.filter((a) =>
      a.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAssignments(filtered);
  }, [searchQuery]);

  // Function to calculate days left
  const getDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = due - today;
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  };

  const renderItem = ({ item }) => {
    const daysLeft = getDaysLeft(item.due);
    const progressWidth = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", `${item.progress * 100}%`],
    });

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: fadeAnim }],
          },
        ]}
      >
        <LinearGradient
          colors={["#ffffffcc", "#f9fafbcc"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.iconBox}>
            <LinearGradient
              colors={["#6366f1", "#8b5cf6"]}
              style={styles.iconInner}
            >
              <MaterialCommunityIcons name={item.icon} size={26} color="#fff" />
            </LinearGradient>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.headerRow}>
              <Text style={styles.subject}>{item.subject}</Text>

              <View
                style={[
                  styles.badge,
                  { backgroundColor: daysLeft <= 2 ? "#ef4444" : "#4ade80" },
                ]}
              >
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={14}
                  color="#fff"
                />
                <Text style={styles.badgeText}>
                  {daysLeft === 0 ? "Due Today" : `${daysLeft}d`}
                </Text>
              </View>
            </View>

            <View style={styles.dueRow}>
              <MaterialCommunityIcons
                name="calendar"
                size={16}
                color="#9ca3af"
              />
              <Text style={styles.dueText}>
                Due: {new Date(item.due).toDateString()}
              </Text>
            </View>

            <View style={styles.progressContainer}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: progressWidth,
                    backgroundColor:
                      item.progress > 0.8
                        ? "#4ade80"
                        : item.progress > 0.4
                        ? "#facc15"
                        : "#f87171",
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {(item.progress * 100).toFixed(0)}% completed
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#4f46e5", "#7c3aed"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.heading}>📚 Assignments</Text>
        <Text style={styles.subHeading}>
          Track, manage, and complete your coursework
        </Text>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={22}
          color="#6b7280"
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="Search subject..."
          placeholderTextColor="#9ca3af"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Assignment List */}
      <FlatList
        data={assignments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  heading: {
    fontSize: scaleFont(24),
    fontWeight: "700",
    color: "#fff",
  },
  subHeading: {
    fontSize: scaleFont(14),
    color: "#e0e7ff",
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: scaleFont(15),
    color: "#111827",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 100,
  },
  cardContainer: {
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  iconBox: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconInner: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subject: {
    fontSize: scaleFont(17),
    fontWeight: "600",
    color: "#111827",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginLeft: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: scaleFont(12),
    marginLeft: 4,
  },
  dueRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  dueText: {
    fontSize: scaleFont(14),
    color: "#6b7280",
    marginLeft: 6,
  },
  progressContainer: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
    marginTop: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 6,
  },
  progressText: {
    fontSize: scaleFont(13),
    color: "#6b7280",
    marginTop: 5,
  },
});
