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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ForgotPassword() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (pass) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{7,}$/;
    return regex.test(pass);
  };

  const handlePhoneSubmit = () => {
    setError("");

    if (!phone || phone.length < 10) {
      setError("Please enter valid phone number");
      return;
    }

    setStep(2);
  };

  const handleOtpSubmit = () => {
    setError("");

    if (otp.length !== 4) {
      setError("Enter valid 4-digit OTP");
      return;
    }

    if (otp !== "1234") {
      setError("Invalid OTP");
      return;
    }

    setStep(3);
  };

  const handlePasswordSubmit = () => {
    setError("");

    if (!validatePassword(password)) {
      setError(
        "Password must be 7+ chars, include 1 capital, 1 number & 1 special character."
      );
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    router.replace("/");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Reset Password</Text>

            {/* STEP 1 - PHONE */}
            {step === 1 && (
              <>
                <Text style={styles.subtitle}>
                  Enter your registered phone number
                </Text>

                <View style={styles.inputBox}>
                  <TextInput
                    placeholder="Phone Number"
                    placeholderTextColor="#888"
                    keyboardType="number-pad"
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={handlePhoneSubmit}
                >
                  <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>
              </>
            )}

            {/* STEP 2 - OTP */}
            {step === 2 && (
              <>
                <Text style={styles.subtitle}>
                  Enter 4-digit OTP sent to your phone
                </Text>

                <View style={styles.inputBox}>
                  <TextInput
                    placeholder="Enter OTP"
                    placeholderTextColor="#888"
                    keyboardType="number-pad"
                    maxLength={4}
                    style={styles.input}
                    value={otp}
                    onChangeText={setOtp}
                  />
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleOtpSubmit}
                >
                  <Text style={styles.buttonText}>Verify OTP</Text>
                </TouchableOpacity>
              </>
            )}

            {/* STEP 3 - PASSWORD */}
            {step === 3 && (
              <>
                <Text style={styles.subtitle}>
                  Set your new password
                </Text>

                <Text style={styles.rules}>
                  Password must contain:
                  {"\n"}• Minimum 7 characters
                  {"\n"}• 1 Capital letter
                  {"\n"}• 1 Number
                  {"\n"}• 1 Special character (!@#$%^&*)
                </Text>

                <View style={styles.inputBox}>
                  <TextInput
                    placeholder="New Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>

                <View style={styles.inputBox}>
                  <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    style={styles.input}
                    value={confirm}
                    onChangeText={setConfirm}
                  />
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={handlePasswordSubmit}
                >
                  <Text style={styles.buttonText}>
                    Reset Password
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {error ? (
              <Text style={styles.error}>{error}</Text>
            ) : null}

            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => router.replace("/")}
            >
              <Text style={styles.back}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    padding: 20,
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
    marginBottom: 15,
  },

  subtitle: {
    color: "#aaa",
    marginBottom: 15,
  },

  rules: {
    color: "#aaa",
    fontSize: 13,
    marginBottom: 15,
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
    marginTop: 5,
  },

  buttonText: {
    color: "#000",
    fontWeight: "600",
  },

  error: {
    color: "#FF3B30",
    marginTop: 10,
  },

  back: {
    color: "#FF7A00",
    textAlign: "center",
  },
});