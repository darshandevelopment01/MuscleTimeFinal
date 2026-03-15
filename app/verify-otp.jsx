import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function VerifyOTP() {
  const router = useRouter();
  const { phone } = useLocalSearchParams();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    setError("");

    if (otp.length !== 4) {
      setError("Enter valid 4-digit OTP");
      return;
    }

    if (otp === "1234") {
      router.push("/reset-password");
    } else {
      setError("Invalid OTP");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Verify OTP</Text>

          <Text style={styles.subtitle}>
            OTP sent to {phone}
          </Text>

          <View style={styles.inputBox}>
            <TextInput
              placeholder="Enter 4-digit OTP"
              placeholderTextColor="#888"
              keyboardType="number-pad"
              maxLength={4}
              style={styles.input}
              value={otp}
              onChangeText={setOtp}
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleVerify}
          >
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#000",
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 25,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    color: "#aaa",
    marginBottom: 20,
  },

  inputBox: {
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginBottom: 12,
  },

  input: {
    color: "#fff",
  },

  button: {
    backgroundColor: "#FF7A00",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#000",
    fontWeight: "600",
  },

  error: {
    color: "#FF3B30",
    marginBottom: 10,
  },
});