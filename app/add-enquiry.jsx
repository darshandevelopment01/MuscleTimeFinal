import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddEnquiry() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    gender: "",
    branch: "",
    source: "",
    interest: "",
    notes: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Enquiry</Text>
          </View>

          {/* PROFILE PHOTO */}
          <View style={styles.photoContainer}>
            <View style={styles.photoCircle}>
              <Ionicons name="person" size={40} color="#666" />
            </View>
            <TouchableOpacity style={styles.uploadBtn}>
              <Ionicons name="camera-outline" size={16} color="#000" />
              <Text style={styles.uploadText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>

          {/* PERSONAL DETAILS */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>PERSONAL DETAILS</Text>

            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              placeholder="Enter full name"
              placeholderTextColor="#777"
              style={styles.input}
              value={form.fullName}
              onChangeText={(text) => handleChange("fullName", text)}
            />

            <Text style={styles.label}>Mobile Number *</Text>
            <TextInput
              placeholder="Enter 10-digit mobile number"
              placeholderTextColor="#777"
              keyboardType="numeric"
              style={styles.input}
              value={form.mobile}
              onChangeText={(text) => handleChange("mobile", text)}
            />

            <Text style={styles.label}>Email Address *</Text>
            <TextInput
              placeholder="Enter email address"
              placeholderTextColor="#777"
              style={styles.input}
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
            />

            <Text style={styles.label}>Gender *</Text>
            <TextInput
              placeholder="Select Gender"
              placeholderTextColor="#777"
              style={styles.input}
              value={form.gender}
              onChangeText={(text) => handleChange("gender", text)}
            />

            <Text style={styles.label}>Branch *</Text>
            <TextInput
              placeholder="Select Branch"
              placeholderTextColor="#777"
              style={styles.input}
              value={form.branch}
              onChangeText={(text) => handleChange("branch", text)}
            />
          </View>

          {/* ENQUIRY DETAILS */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>ENQUIRY DETAILS</Text>

            <Text style={styles.label}>Enquiry Source *</Text>

            <View style={styles.pickerWrapper}>
            <Picker
                selectedValue={form.source}
                onValueChange={(itemValue) => handleChange("source", itemValue)}
                dropdownIconColor="#fff"
                style={styles.picker}
            >
                <Picker.Item label="Select Source" value="" />
                <Picker.Item label="Walk-in" value="Walk-in" />
                <Picker.Item label="Social Media" value="Social Media" />
                <Picker.Item label="Referral" value="Referral" />
                <Picker.Item label="Website" value="Website" />
                <Picker.Item label="Phone Call" value="Phone Call" />
            </Picker>
            </View>

            <Text style={styles.label}>Notes</Text>
            <TextInput
              placeholder="Add any additional notes..."
              placeholderTextColor="#777"
              style={[styles.input, { height: 100 }]}
              multiline
              value={form.notes}
              onChangeText={(text) => handleChange("notes", text)}
            />
          </View>

          {/* BUTTONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveText}>Save & Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 15,
  },

  photoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  photoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FF7A00",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  uploadText: {
    color: "#000",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },

  sectionTitle: {
    color: "#888",
    fontSize: 12,
    marginBottom: 10,
    letterSpacing: 1,
  },

  label: {
    color: "#ccc",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#1C1C1E",
    padding: 14,
    borderRadius: 12,
    color: "#fff",
    marginBottom: 5,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#444",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 10,
  },

  cancelText: {
    color: "#fff",
  },

  saveBtn: {
    flex: 1,
    backgroundColor: "#FF7A00",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  saveText: {
    color: "#000",
    fontWeight: "600",
  },
  pickerWrapper: {
  backgroundColor: "#1C1C1E",
  borderRadius: 12,
  marginBottom: 5,
  overflow: "hidden",
},

picker: {
  color: "#fff",
},
});