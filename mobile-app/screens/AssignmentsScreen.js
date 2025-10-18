import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

// ✅ Updated data: Added teacher profile, datePosted, and file
const assignmentsData = [
  {
    id: "1",
    assignmentName: "Exam Notes",
    subject: "Python",
    teacher: "Rajdeep Joshi",
    teacherImage: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
    datePosted: "2025-10-05",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    image: "https://imgs.search.brave.com/PsbP4RKAy9iadDcQsQl-EobZUOikXOjMaE8mcWXv5ck/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudGVtcGxhdGUu/bmV0LzQzNDIyNS9T/dHVkZW50LUFzc2ln/bm1lbnQtVHJhY2tl/ci1UZW1wbGF0ZS1l/ZGl0LW9ubGluZS5w/bmc",
  },
  {
    id: "2",
    assignmentName: "ASP.NET chapter 3 assignment",
    subject: "ASP.NET",
    teacher: "Ripal Pandya",
    teacherImage: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
    datePosted: "2025-10-07",
    fileUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-pdf-file.pdf",
    image:
      "https://imgs.search.brave.com/PsbP4RKAy9iadDcQsQl-EobZUOikXOjMaE8mcWXv5ck/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudGVtcGxhdGUu/bmV0LzQzNDIyNS9T/dHVkZW50LUFzc2ln/bm1lbnQtVHJhY2tl/ci1UZW1wbGF0ZS1l/ZGl0LW9ubGluZS5w/bmc",
  },
  {
    id: "3",
    assignmentName: "Java chapter 1 Assignment",
    subject: "java",
    teacher: "Milind Anandpara",
    teacherImage: "https://cdn-icons-png.flaticon.com/512/4140/4140061.png",
    datePosted: "2025-10-08",
    fileUrl:
      "https://file-examples.com/storage/fe3b95dbbaf6a6116a4b9a4/2017/10/file-sample_150kB.pdf",
    image: "https://imgs.search.brave.com/PsbP4RKAy9iadDcQsQl-EobZUOikXOjMaE8mcWXv5ck/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudGVtcGxhdGUu/bmV0LzQzNDIyNS9T/dHVkZW50LUFzc2ln/bm1lbnQtVHJhY2tl/ci1UZW1wbGF0ZS1l/ZGl0LW9ubGluZS5w/bmc",
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
      useNativeDriver: false,
    }).start();
  }, []);

  // 🔍 Filter by assignment or subject
  useEffect(() => {
    const filtered = assignmentsData.filter(
      (a) =>
        a.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.assignmentName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAssignments(filtered);
  }, [searchQuery]);

  // 📎 Download handler
  const handleDownload = (url) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
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
        colors={["#ffffff", "#f9fafb"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Assignment Header */}
        <Text style={styles.assignmentTitle}>{item.assignmentName}</Text>

        {/* Teacher Info */}
        <View style={styles.teacherRow}>
          <Image
            source={{ uri: item.teacherImage }}
            style={styles.teacherImg}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.teacherName}>{item.teacher}</Text>
            <Text style={styles.subjectText}>📘 {item.subject}</Text>
          </View>
          <Text style={styles.dateText}>
            {new Date(item.datePosted).toDateString()}
          </Text>
        </View>

        {/* Attachment Section */}
        <View style={styles.attachmentBox}>
          <Image source={{ uri: item.image }} style={styles.attachmentImg} />
          <TouchableOpacity
            style={styles.downloadBtn}
            onPress={() => handleDownload(item.fileUrl)}
          >
            <MaterialCommunityIcons
              name="download"
              size={20}
              color="#fff"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.downloadText}>Download</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <LinearGradient
        colors={["#4f46e5", "#7c3aed"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.heading}>📘 Assignments</Text>
        <Text style={styles.subHeading}>View teachers & attachments</Text>
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
          placeholder="Search assignment or subject..."
          placeholderTextColor="#9ca3af"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* List */}
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
    fontSize: scaleFont(22),
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
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  assignmentTitle: {
    fontSize: scaleFont(17),
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  teacherRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  teacherImg: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: 10,
  },
  teacherName: {
    fontSize: scaleFont(15),
    fontWeight: "600",
    color: "#111827",
  },
  subjectText: {
    fontSize: scaleFont(13),
    color: "#6b7280",
  },
  dateText: {
    fontSize: scaleFont(12),
    color: "#9ca3af",
  },
  attachmentBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  attachmentImg: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4f46e5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  downloadText: {
    color: "#fff",
    fontSize: scaleFont(13),
    fontWeight: "500",
  },
});
