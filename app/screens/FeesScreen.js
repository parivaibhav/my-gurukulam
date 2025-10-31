import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function FeePaymentScreen() {
  const [showWebView, setShowWebView] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState(null);
  const [status, setStatus] = useState(null);

  const backend = "http://YOUR_LOCAL_IP:5000"; // ⚙️ Replace with backend IP

  const startPayment = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backend}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: "John Doe",
          studentId: "STU123",
          amount: 1000,
        }),
      });
      const data = await res.json();
      setCheckoutUrl(data.checkoutUrl);
      setShowWebView(true);
    } catch (err) {
      console.error("Payment error:", err);
      setStatus({ type: "error", message: "Failed to initiate payment." });
    } finally {
      setLoading(false);
    }
  };

  const onNavigationChange = async (navState) => {
    const url = navState.url;
    if (url.includes("payment-success")) {
      setShowWebView(false);
      try {
        const verify = await fetch(`${backend}/api/payment/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: "order_xxx",
            paymentId: "pay_xxx",
            status: "paid",
          }),
        });
        const result = await verify.json();
        setReceiptUrl(result.receiptUrl);
        setStatus({ type: "success", message: "Payment Successful ✅" });
      } catch (err) {
        setStatus({ type: "error", message: "Verification failed ❌" });
      }
    } else if (url.includes("payment-failed")) {
      setShowWebView(false);
      setStatus({ type: "error", message: "Payment Failed ❌" });
    }
  };

  const downloadReceipt = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + "receipt.pdf";
      const download = await FileSystem.downloadAsync(receiptUrl, fileUri);
      await Sharing.shareAsync(download.uri);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#facc15" />
        <Text style={styles.loadingText}>Preparing secure payment...</Text>
      </View>
    );

  if (showWebView)
    return (
      <WebView
        source={{ uri: checkoutUrl }}
        onNavigationStateChange={onNavigationChange}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator size="large" color="#facc15" style={{ flex: 1 }} />
        )}
      />
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Platform.OS === "android" ? "#facc15" : "transparent"}
        translucent={false}
      />

      <LinearGradient colors={["#facc15", "#eab308"]} style={styles.header}>
        <Text style={styles.headerText}>College Fee Payment</Text>
      </LinearGradient>

      <View style={styles.container}>
        <View style={styles.card}>
          <MaterialCommunityIcons
            name="school-outline"
            size={50}
            color="#ca8a04"
            style={{ marginBottom: 12 }}
          />
          <Text style={styles.amountLabel}>Pending Fees</Text>
          <Text style={styles.amountValue}>₹1000</Text>

          <TouchableOpacity style={styles.payButton} onPress={startPayment}>
            <LinearGradient
              colors={["#facc15", "#eab308"]}
              style={styles.payGradient}
            >
              <MaterialCommunityIcons
                name="credit-card-outline"
                size={22}
                color="#000"
              />
              <Text style={styles.payText}>Pay Securely</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {status && (
          <View
            style={[
              styles.statusBox,
              status.type === "success"
                ? { backgroundColor: "#fef9c3" }
                : { backgroundColor: "#fef2f2" },
            ]}
          >
            <MaterialCommunityIcons
              name={status.type === "success" ? "check-circle" : "close-circle"}
              color={status.type === "success" ? "#84cc16" : "#ef4444"}
              size={28}
            />
            <Text
              style={[
                styles.statusText,
                { color: status.type === "success" ? "#365314" : "#991b1b" },
              ]}
            >
              {status.message}
            </Text>
          </View>
        )}

        {receiptUrl && (
          <TouchableOpacity
            style={styles.receiptButton}
            onPress={downloadReceipt}
          >
            <MaterialCommunityIcons
              name="file-download-outline"
              color="#000"
              size={22}
            />
            <Text style={styles.receiptText}>Download Receipt</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fffbeb",
  },
  header: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 3,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#422006",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 28,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  amountLabel: { fontSize: 18, color: "#a16207", marginBottom: 8 },
  amountValue: {
    fontSize: 40,
    fontWeight: "900",
    color: "#854d0e",
    marginBottom: 20,
  },
  payButton: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 10,
  },
  payGradient: {
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  payText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "700",
  },
  statusBox: {
    marginTop: 25,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
  },
  receiptButton: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#facc15",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
  },
  receiptText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffbeb",
  },
  loadingText: {
    marginTop: 12,
    color: "#92400e",
    fontSize: 16,
    fontWeight: "600",
  },
});
