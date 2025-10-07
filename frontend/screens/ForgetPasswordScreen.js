import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Toast from "../components/Toast";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

export default function ForgetPasswordScreen() {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("error");

  const showToast = (message, type = "error") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(false);
    setTimeout(() => setToastVisible(true), 50);
  };

  const handleResetPassword = () => {
    const trimmedMobile = mobile.trim();
    if (!trimmedMobile || trimmedMobile.length < 10) {
      showToast("Please enter a valid mobile number", "error");
      return;
    }

    // ✅ Navigate to OTP screen after valid mobile input
    navigation.navigate("Otp", { mobile: trimmedMobile });

    // Optional: show success toast
    showToast(`OTP sent to ${trimmedMobile}`, "success");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your mobile number to reset your password
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor="#a1a1aa"
            keyboardType="phone-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: 20 }}
          >
            <Text style={styles.backText}>Back to Login</Text>
          </TouchableOpacity>
        </View>

        <Toast visible={toastVisible} message={toastMessage} type={toastType} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f3f4f6" },
  container: { flex: 1, justifyContent: "center", padding: 25 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  title: {
    fontSize: scaleFont(28),
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: scaleFont(16),
    color: "#6b7280",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: scaleFont(16),
    backgroundColor: "#f9fafb",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#1580faff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  buttonText: {
    fontSize: scaleFont(18),
    fontWeight: "700",
    color: "#fff",
  },
  backText: {
    fontSize: scaleFont(16),
    color: "#2563eb",
    textAlign: "center",
    fontWeight: "600",
  },
});
