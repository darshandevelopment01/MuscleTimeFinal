import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


export default function ResetPassword() {
  const router = useRouter();
  const API_URL = "https://muscletime-backend.vercel.app/api";
  const { identifier, otp } = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (pass) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{7,}$/;
    return regex.test(pass);
  };

  // const handleReset = () => {
  //   setError("");

  //   if (!validatePassword(password)) {
  //     setError(
  //       "Password must be 7+ chars, include 1 capital, 1 number & 1 special character."
  //     );
  //     return;
  //   }

  //   if (password !== confirm) {
  //     setError("Passwords do not match");
  //     return;
  //   }

  //   router.replace("/");
  // };
const handleReset = async () => {
  try {
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

    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: identifier,
        otp: otp,
        newPassword: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Failed to reset password");
      return;
    }

    alert("Password reset successful");

    router.replace("/");

  } catch (err) {
    console.log(err);
    setError("Network error. Please try again.");
  }
};
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Set New Password</Text>

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

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleReset}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
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
    marginTop: 10,
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