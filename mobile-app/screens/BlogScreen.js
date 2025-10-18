import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

// ✅ Blog data with online images
const blogs = [
  {
    id: "1",
    title: "Top 10 Study Tips for College Students",
    author: "Admin",
    date: "Oct 6, 2025",
    image: {
      uri: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&auto=format&fit=crop&q=60",
    },
    description:
      "Discover effective ways to manage your time and boost productivity during your college journey.",
  },
  {
    id: "2",
    title: "How to Prepare for Your Final Exams",
    author: "Prof. Sharma",
    date: "Oct 5, 2025",
    image: {
      uri: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=600&auto=format&fit=crop&q=60",
    },
    description:
      "Learn smart exam strategies, revision methods, and stress management tips for success.",
  },
  {
    id: "3",
    title: "Why Joining Clubs Can Boost Your Career",
    author: "Placement Cell",
    date: "Oct 4, 2025",
    image: {
      uri: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    },
    description:
      "Explore how extracurricular activities help you develop essential leadership and teamwork skills.",
  },
  {
    id: "4",
    title: "Balancing Studies and Hobbies Effectively",
    author: "Counseling Dept.",
    date: "Oct 3, 2025",
    image: {
      uri: "https://images.unsplash.com/photo-1503676264031-0e7ce7c7e59c?w=800",
    },
    description:
      "Find out how to maintain a healthy study-life balance and improve your focus and motivation.",
  },
];

export default function BlogScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [search, setSearch] = useState("");

  const theme = isDark ? darkTheme : lightTheme;

  // Filter blogs based on search
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <FlatList
        data={filteredBlogs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
        ListHeaderComponent={
          <>
            {/* Header */}
            <LinearGradient
              colors={isDark ? ["#1f2937", "#0f172a"] : ["#2563eb", "#1e3a8a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.header}
            >
              <Text style={[styles.headerText, { color: "#fff" }]}>
                College Blog
              </Text>
            </LinearGradient>

            {/* Search Bar */}
            <View style={[styles.searchBox, { backgroundColor: theme.card }]}>
              <MaterialCommunityIcons
                name="magnify"
                size={22}
                color={theme.textSecondary}
                style={{ marginRight: 8 }}
              />
              <TextInput
                placeholder="Search blog..."
                placeholderTextColor={theme.textSecondary}
                style={[styles.searchInput, { color: theme.textPrimary }]}
                value={search}
                onChangeText={setSearch}
              />
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.card,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
            onPress={() => navigation.navigate("BlogDetail", { blog: item })}
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={[styles.title, { color: theme.textPrimary }]}>
                {item.title}
              </Text>
              <Text
                style={[styles.description, { color: theme.textSecondary }]}
                numberOfLines={3}
              >
                {item.description}
              </Text>
              <View style={styles.metaRow}>
                <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                  {item.author}
                </Text>
                <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                  {item.date}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
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
  safeArea: { flex: 1 },
  header: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
  },
  headerText: {
    fontSize: scaleFont(22),
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: { flex: 1, fontSize: scaleFont(15) },
  card: {
    borderRadius: 18,
    marginBottom: 18,
    borderWidth: 1,
    overflow: "hidden",
    marginHorizontal: 20,
  },
  image: { width: "100%", height: 180 },
  cardContent: { padding: 15 },
  title: { fontSize: scaleFont(17), fontWeight: "700", marginBottom: 6 },
  description: { fontSize: scaleFont(14), lineHeight: 20, marginBottom: 10 },
  metaRow: { flexDirection: "row", justifyContent: "space-between" },
  metaText: { fontSize: scaleFont(13) },
});
