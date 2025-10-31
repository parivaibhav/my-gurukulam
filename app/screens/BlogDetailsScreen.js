import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

export default function BlogDetailScreen({ route }) {
  const { blog } = route.params;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = isDark
    ? { bg: "#0f172a", textPrimary: "#f1f5f9", textSecondary: "#94a3b8" }
    : { bg: "#f9fafb", textPrimary: "#111827", textSecondary: "#6b7280" };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Image source={blog.image} style={styles.image} />
        <View style={{ padding: 20 }}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            {blog.title}
          </Text>
          <View style={styles.metaRow}>
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              {blog.author}
            </Text>
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              {blog.date}
            </Text>
          </View>
          <Text style={[styles.description, { color: theme.textPrimary }]}>
            {blog.description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: { width: "100%", height: 250 },
  title: { fontSize: scaleFont(20), fontWeight: "700", marginBottom: 10 },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  metaText: { fontSize: scaleFont(14) },
  description: { fontSize: scaleFont(16), lineHeight: 24 },
});
