import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

export default function ConvertMember() {
  const router = useRouter();

  const [form, setForm] = useState({
    category: "",
    plan: "",
    dob: "",
    gst: "No Tax",
    discount: "0%",
    paymentReceived: "",
    paymentRemaining: "",
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
            <Text style={styles.headerTitle}>Convert to Member</Text>
          </View>

          {/* ENQUIRY DETAILS PREVIEW */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>ENQUIRY DETAILS</Text>

            <Text style={styles.previewText}>Name: Darshan Development</Text>
            <Text style={styles.previewText}>Email: darshandevelopment01@gmail.com</Text>
            <Text style={styles.previewText}>Mobile: 9876543210</Text>
          </View>

          {/* MEMBERSHIP DETAILS */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>MEMBERSHIP DETAILS</Text>

            {/* Plan Category */}
            <Text style={styles.label}>Plan Category *</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={form.category}
                onValueChange={(val) => handleChange("category", val)}
                dropdownIconColor="#fff"
                style={styles.picker}
              >
                <Picker.Item label="Select Category" value="" />
                <Picker.Item label="Monthly" value="Monthly" />
                <Picker.Item label="Quarterly" value="Quarterly" />
                <Picker.Item label="Half Yearly" value="Half Yearly" />
                <Picker.Item label="Annual" value="Annual" />
              </Picker>
            </View>

            {/* Membership Plan */}
            <Text style={styles.label}>Membership Plan *</Text>
            <TextInput
              placeholder="Select a category first"
              placeholderTextColor="#777"
              style={styles.input}
              value={form.plan}
              onChangeText={(text) => handleChange("plan", text)}
            />

            {/* Date of Birth */}
            <Text style={styles.label}>Date of Birth *</Text>
            <TextInput
              placeholder="Select date of birth"
              placeholderTextColor="#777"
              style={styles.input}
              value={form.dob}
              onChangeText={(text) => handleChange("dob", text)}
            />

            {/* Tax Slab */}
            <Text style={styles.label}>Tax Slab (GST)</Text>
            <TextInput
              placeholder="No Tax"
              placeholderTextColor="#777"
              style={styles.input}
              value={form.gst}
              onChangeText={(text) => handleChange("gst", text)}
            />

            {/* Discount */}
            <Text style={styles.label}>Discount %</Text>
            <TextInput
              placeholder="0% (No Discount)"
              placeholderTextColor="#777"
              style={styles.input}
              value={form.discount}
              onChangeText={(text) => handleChange("discount", text)}
            />

            {/* Payment Received */}
            <Text style={styles.label}>Payment Received *</Text>
            <TextInput
              placeholder="Enter amount"
              placeholderTextColor="#777"
              keyboardType="numeric"
              style={styles.input}
              value={form.paymentReceived}
              onChangeText={(text) => handleChange("paymentReceived", text)}
            />

            {/* Payment Remaining */}
            <Text style={styles.label}>Payment Remaining</Text>
            <TextInput
              placeholder="Auto calculated"
              placeholderTextColor="#777"
              keyboardType="numeric"
              style={styles.input}
              value={form.paymentRemaining}
              onChangeText={(text) => handleChange("paymentRemaining", text)}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => router.back()}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveText}>Convert to Member</Text>
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

  previewText: {
    color: "#fff",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#1C1C1E",
    padding: 14,
    borderRadius: 12,
    color: "#fff",
    marginBottom: 5,
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
});