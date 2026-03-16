import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
export default function LoginScreen() {
  const API_URL = "https://muscletime-backend.vercel.app/api";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState("");

  // const handleLogin = () => {
  //   setError("");

  //   if (!email || !password) {
  //     setError("Please enter email and password");
  //     return;
  //   }

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   if (!emailRegex.test(email)) {
  //     setError("Please enter a valid email address");
  //     return;
  //   }

  //   if (password.length < 4) {
  //     setError("Password must be at least 4 characters");
  //     return;
  //   }

  //   if (email === "admin@muscletime.com" && password === "1234") {
  //     router.replace("/(tabs)/enquiry");
  //   } else {
  //     setError("Invalid email or password");
  //   }
  // };
const handleLogin = async () => {
  try {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Login failed");
      return;
    }

    console.log("Login success:", data.user);

    // Navigate after login
    router.replace("/(tabs)/enquiry");

  } catch (error) {
    console.log(error);
    setError("Network error. Please try again.");
  }
};
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo.jpeg")}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.appName}>MuscleTime</Text>
            <Text style={styles.subtitle}>Login to continue</Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            {/* Email */}
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputBox}>
              <Ionicons name="mail-outline" size={18} color="#888" />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#888"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <Text style={[styles.label, { marginTop: 15 }]}>
              Password
            </Text>
            <View style={styles.inputBox}>
              <Ionicons name="lock-closed-outline" size={18} color="#888" />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#888"
                secureTextEntry={secure}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setSecure(!secure)}>
                <Ionicons
                  name={secure ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color="#888"
                />
              </TouchableOpacity>
            </View>

            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}

            <TouchableOpacity
              onPress={() => router.push("/forgot-password")}
            >
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleLogin}
            >
              <Ionicons
                name="log-in-outline"
                size={18}
                color="#000"
              />
              <Text style={styles.loginText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  logoImage: {
    width: 160,
    height: 160,
    marginBottom: 15,
  },

  appName: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#aaa",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 20,
  },

  label: {
    color: "#ccc",
    marginBottom: 6,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },

  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 10,
  },

  errorText: {
    color: "#FF3B30",
    marginTop: 8,
    fontSize: 13,
  },

  forgot: {
    color: "#FF7A00",
    textAlign: "right",
    marginTop: 10,
  },

  loginBtn: {
    backgroundColor: "#FF7A00",
    height: 50,
    borderRadius: 14,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },

  loginText: {
    color: "#000",
    fontWeight: "600",
  },
});