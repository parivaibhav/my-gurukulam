import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Toast from "../components/Toast";

const { width } = Dimensions.get("window");
const scaleFont = (size) => Math.round((size * width) / 375);

export default function OTPVerificationScreen() {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("error");

  const inputs = useRef([]);
  const animations = useRef(otp.map(() => new Animated.Value(1))).current;

  const showToast = (message, type = "error") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(false);
    setTimeout(() => setToastVisible(true), 50);
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
    Animated.spring(animations[index], {
      toValue: 1.1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  const handleBlur = (index) => {
    setFocusedIndex(null);
    Animated.spring(animations[index], {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  const handleChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < 3) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = () => {
    if (otp.some((d) => d === "")) {
      showToast("Please enter the 4-digit OTP", "error");
      return;
    }

    showToast("OTP Verified Successfully!", "success");
    setTimeout(() => navigation.navigate("Dashboard"));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            Enter the 4-digit code sent to your mobile number
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.animatedBox,
                  {
                    transform: [{ scale: animations[index] }],
                    shadowColor: focusedIndex === index ? "#facc15" : "#000",
                    shadowOpacity: focusedIndex === index ? 0.4 : 0.1,
                  },
                ]}
              >
                <TextInput
                  ref={(ref) => (inputs.current[index] = ref)}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  onFocus={() => handleFocus(index)}
                  onBlur={() => handleBlur(index)}
                  style={styles.otpInput}
                  textAlign="center"
                  placeholder="•"
                  placeholderTextColor="#b0b0b0"
                />
              </Animated.View>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => showToast("OTP Resent!", "info")}
            style={{ marginTop: 15 }}
          >
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        </View>

        <Toast visible={toastVisible} message={toastMessage} type={toastType} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fcefb4", // Soft yellow background
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },
  card: {
    backgroundColor: "#fffef7",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f4e79c",
  },
  title: {
    fontSize: scaleFont(28),
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: scaleFont(15),
    color: "#6b7280",
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    width: "80%",
  },
  animatedBox: {
    borderRadius: 14,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1.5,
    borderColor: "#facc15",
    borderRadius: 14,
    fontSize: 24,
    backgroundColor: "#fffbea",
    color: "#111827",
    fontWeight: "600",
  },
  button: {
    width: "100%",
    height: 52,
    backgroundColor: "#facc15",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  buttonText: {
    fontSize: scaleFont(18),
    fontWeight: "700",
    color: "#111827",
  },
  resendText: {
    color: "#b45309",
    fontWeight: "600",
    textAlign: "center",
  },
});
