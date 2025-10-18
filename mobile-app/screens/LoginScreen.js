import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import Toast from "../components/Toast";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

export default function LoginScreen({ navigation }) {
  const [mobile, setMobile] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleLogin = () => {
    const trimmedMobile = mobile.trim();

    if (!trimmedMobile) {
      showToast("Please enter your mobile number");
      return;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(trimmedMobile)) {
      showToast("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    navigation.navigate("Otp", { mobile: trimmedMobile });
  };

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(false);
    setTimeout(() => setToastVisible(true), 50);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Image
          source={require("../assets/gurukul-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login with your mobile number</Text>

        <TextInput
          placeholder="Mobile Number"
          placeholderTextColor="#888"
          value={mobile}
          onChangeText={setMobile}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={10}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>

      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastMessage.includes("success") ? "success" : "error"}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  inner: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  title: {
    fontSize: scaleFont(26),
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: scaleFont(16),
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: scaleFont(16),
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: scaleFont(18),
    fontWeight: "600",
  },
});
