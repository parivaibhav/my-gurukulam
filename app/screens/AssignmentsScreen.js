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
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

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
    image:
      "https://img.freepik.com/free-vector/exam-time-concept-illustration_114360-8763.jpg",
  },
  {
    id: "2",
    assignmentName: "ASP.NET Chapter 3 Assignment",
    subject: "ASP.NET",
    teacher: "Ripal Pandya",
    teacherImage: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
    datePosted: "2025-10-07",
    fileUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-pdf-file.pdf",
    image:
      "https://img.freepik.com/free-vector/hand-coding-concept-illustration_114360-8213.jpg",
  },
  {
    id: "3",
    assignmentName: "Java Chapter 1 Assignment",
    subject: "Java",
    teacher: "Milind Anandpara",
    teacherImage: "https://cdn-icons-png.flaticon.com/512/4140/4140061.png",
    datePosted: "2025-10-08",
    fileUrl:
      "https://file-examples.com/storage/fe3b95dbbaf6a6116a4b9a4/2017/10/file-sample_150kB.pdf",
    image:
      "https://img.freepik.com/free-vector/java-programming-language-computer-technology_23-2148174417.jpg",
  },
];

export default function AssignmentsScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [assignments, setAssignments] = useState(assignmentsData);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 🔸 Fade animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  // 🔍 Search filter
  useEffect(() => {
    const filtered = assignmentsData.filter(
      (a) =>
        a.assignmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAssignments(filtered);
  }, [searchQuery]);

  // 📎 File Download
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
        colors={["#fffde7", "#fff9c4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Assignment Title */}
        <Text style={styles.assignmentTitle}>{item.assignmentName}</Text>

        {/* Teacher Info */}
        <View style={styles.teacherRow}>
          <Image
            source={{ uri: item.teacherImage }}
            style={styles.teacherImg}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.teacherName}>{item.teacher}</Text>
            <View style={styles.subjectRow}>
              <MaterialCommunityIcons
                name="book-open-variant"
                size={14}
                color="#92400e"
              />
              <Text style={styles.subjectText}>{item.subject}</Text>
            </View>
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
            <MaterialCommunityIcons name="download" size={20} color="#fff" />
            <Text style={styles.downloadText}>Download</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 🔙 Header with Back Button */}
      <LinearGradient
        colors={["#facc15", "#fbbf24"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#78350f" />
          </TouchableOpacity>
          <Text style={styles.heading}>Assignments</Text>
        </View>
        <Text style={styles.subHeading}>Explore teacher uploads</Text>
      </LinearGradient>

      {/* 🔍 Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={22}
          color="#b45309"
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="Search assignment or subject..."
          placeholderTextColor="#a16207"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* 🗂️ Assignment List */}
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
    backgroundColor: "#fffdf3",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
    backgroundColor: "#fef3c7",
    padding: 6,
    borderRadius: 10,
  },
  heading: {
    fontSize: scaleFont(22),
    fontWeight: "700",
    color: "#78350f",
  },
  subHeading: {
    fontSize: scaleFont(14),
    color: "#92400e",
    marginTop: 5,
    marginLeft: 3,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fefce8",
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  searchInput: {
    flex: 1,
    fontSize: scaleFont(15),
    color: "#78350f",
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  assignmentTitle: {
    fontSize: scaleFont(17),
    fontWeight: "700",
    color: "#78350f",
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
    color: "#78350f",
  },
  subjectRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  subjectText: {
    fontSize: scaleFont(13),
    color: "#92400e",
    marginLeft: 4,
  },
  dateText: {
    fontSize: scaleFont(12),
    color: "#a16207",
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
    backgroundColor: "#facc15",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  downloadText: {
    color: "#78350f",
    fontSize: scaleFont(13),
    fontWeight: "600",
    marginLeft: 6,
  },
});
