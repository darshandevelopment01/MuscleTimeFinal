import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddOffer() {
  const router = useRouter();

  const [discountType, setDiscountType] = useState("Percentage");
  const [category, setCategory] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const categories = ["Gym Plans", "Yoga Plans", "PT Plans"];

  const plansData = {
    "Gym Plans": [
      { name: "Monthly Basic", price: "₹1500 / 1 month(s)" },
      { name: "Quarterly Premium", price: "₹4000 / 3 month(s)" },
      { name: "Half Yearly Gold", price: "₹7500 / 6 month(s)" },
      { name: "Annual Platinum", price: "₹12000 / 12 month(s)" },
    ],
    "Yoga Plans": [
      { name: "Yoga Beginner", price: "₹2000 / 1 month(s)" },
      { name: "Yoga Advanced", price: "₹5000 / 3 month(s)" },
    ],
    "PT Plans": [
      { name: "PT 12 Sessions", price: "₹6000" },
      { name: "PT 24 Sessions", price: "₹10000" },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Offer</Text>
        </View>

        {/* Image Upload */}
        <View style={styles.card}>
          <Text style={styles.label}>
            Offer Image/GIF (Optional)
          </Text>

          <TouchableOpacity style={styles.uploadBox}>
            <Ionicons
              name="cloud-upload-outline"
              size={32}
              color="#777"
            />
            <Text style={styles.uploadText}>
              Click to upload image or GIF
            </Text>
            <Text style={styles.uploadSubText}>
              Max size: 5MB
            </Text>
          </TouchableOpacity>
        </View>

        {/* Title & Description */}
        <View style={styles.card}>
          <Text style={styles.label}>Offer Title *</Text>
          <TextInput
            placeholder="e.g., New Year Special"
            placeholderTextColor="#777"
            style={styles.input}
          />

          <Text style={[styles.label, { marginTop: 15 }]}>
            Description *
          </Text>
          <TextInput
            placeholder="Describe the offer..."
            placeholderTextColor="#777"
            style={[styles.input, { height: 90 }]}
            multiline
          />
        </View>

        {/* Discount Section */}
        <View style={styles.card}>
          <Text style={styles.label}>Discount Type *</Text>

          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>
              % {discountType}
            </Text>
            <Ionicons
              name="chevron-down"
              size={18}
              color="#aaa"
            />
          </TouchableOpacity>

          <Text style={[styles.label, { marginTop: 15 }]}>
            Discount Value ({discountType === "Percentage" ? "%" : "₹"}) *
          </Text>

          <TextInput
            placeholder="e.g., 20"
            placeholderTextColor="#777"
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        {/* Validity */}
        <View style={styles.card}>
          <Text style={styles.label}>Validity Period *</Text>

          <View style={styles.dateRow}>
            <TouchableOpacity style={styles.dateBtn}>
              <Ionicons name="calendar-outline" size={18} color="#fff" />
              <Text style={styles.dateText}>Start Date</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dateBtn}>
              <Ionicons name="calendar-outline" size={18} color="#fff" />
              <Text style={styles.dateText}>End Date</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Plan Category */}
        <View style={styles.card}>
          <Text style={styles.label}>Plan Category *</Text>

          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryOption,
                category === cat && styles.selectedBorder,
              ]}
              onPress={() => {
                setCategory(cat);
                setSelectedPlan("");
              }}
            >
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Plans */}
        {category !== "" && (
          <View style={styles.card}>
            <Text style={styles.label}>Applicable Plans *</Text>

            {plansData[category].map((plan) => (
              <TouchableOpacity
                key={plan.name}
                style={[
                  styles.planCard,
                  selectedPlan === plan.name &&
                    styles.selectedBorder,
                ]}
                onPress={() => setSelectedPlan(plan.name)}
              >
                <View style={styles.radioCircle}>
                  {selectedPlan === plan.name && (
                    <View style={styles.radioDot} />
                  )}
                </View>

                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.planName}>
                    {plan.name}
                  </Text>
                  <Text style={styles.planPrice}>
                    {plan.price}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Create Button */}
        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createText}>Create Offer</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },

  label: {
    color: "#fff",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
    color: "#fff",
  },

  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#333",
    borderRadius: 14,
    padding: 25,
    alignItems: "center",
  },

  uploadText: {
    color: "#aaa",
    marginTop: 10,
  },

  uploadSubText: {
    color: "#555",
    fontSize: 12,
  },

  dropdown: {
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    height: 45,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dropdownText: {
    color: "#fff",
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dateBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    padding: 10,
    borderRadius: 12,
    width: "48%",
    justifyContent: "center",
    gap: 6,
  },

  dateText: {
    color: "#fff",
  },

  categoryOption: {
    backgroundColor: "#1C1C1E",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },

  categoryText: {
    color: "#fff",
  },

  planCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  planName: {
    color: "#fff",
    fontWeight: "600",
  },

  planPrice: {
    color: "#aaa",
    marginTop: 4,
  },

  selectedBorder: {
    borderWidth: 1,
    borderColor: "#FF7A00",
  },

  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#FF7A00",
    alignItems: "center",
    justifyContent: "center",
  },

  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF7A00",
  },

  createBtn: {
    backgroundColor: "#FF7A00",
    height: 50,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  createText: {
    color: "#000",
    fontWeight: "600",
  },
});