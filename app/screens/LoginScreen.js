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
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
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
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fcefb4" />

      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            source={require("../assets/gurukul-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login with your mobile number</Text>

          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="phone-android"
              size={22}
              color="#c47f00"
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="Enter Mobile Number"
              placeholderTextColor="#9ca3af"
              value={mobile}
              onChangeText={setMobile}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>

          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <MaterialIcons name="send" size={20} color="#fff" />
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>Empowering Education Digitally</Text>
        </View>

        <Toast
          visible={toastVisible}
          message={toastMessage}
          type={toastMessage.includes("success") ? "success" : "error"}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcefb4", // single background color
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 25,
  },
  title: {
    fontSize: scaleFont(26),
    fontWeight: "700",
    color: "#c47f00",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: scaleFont(15),
    color: "#6b7280",
    marginBottom: 30,
    textAlign: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: scaleFont(16),
    color: "#111827",
  },
  button: {
    width: "100%",
    backgroundColor: "#c47f00",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    shadowColor: "#c47f00",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: scaleFont(18),
    fontWeight: "600",
    marginLeft: 5,
  },
  footerText: {
    marginTop: 25,
    fontSize: scaleFont(13),
    color: "#a16207",
    textAlign: "center",
  },
});
