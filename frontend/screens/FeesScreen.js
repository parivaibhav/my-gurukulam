import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Scale font size based on screen width
const scaleFont = (size) => Math.round((size * width) / 375);

export default function FeesScreen() {
  const handlePayment = () => {
    Alert.alert("Payment Done ✅");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Pending Fees</Text>
          <Text style={styles.amount}>₹5000</Text>

          <TouchableOpacity style={styles.button} onPress={handlePayment}>
            <Text style={styles.buttonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  container: {
    flex: 1,
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
  title: {
    fontSize: scaleFont(20),
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 10,
  },
  amount: {
    fontSize: scaleFont(28),
    fontWeight: "700",
    color: "#111827",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#facc15",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 3,
  },
  buttonText: {
    color: "#111827",
    fontSize: scaleFont(16),
    fontWeight: "600",
  },
});
