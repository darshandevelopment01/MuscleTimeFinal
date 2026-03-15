import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

export default function OffersScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Active Offers</Text>
          <Text style={styles.subtitle}>0 offers available</Text>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push("/add-offer")}
        >
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Empty State Card */}
      <View style={[styles.card, { width: width - 32 }]}>
        <Ionicons
          name="gift-outline"
          size={55}
          color="#777"
          style={{ marginBottom: 15 }}
        />

        <Text style={styles.emptyText}>
          No active offers at the moment
        </Text>

        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => router.push("/add-offer")}
        >
          <Ionicons name="add" size={18} color="#000" />
          <Text style={styles.createText}>
            Create First Offer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#777",
    fontSize: 12,
    marginTop: 2,
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF7A00",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },

  addText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    color: "#aaa",
    marginBottom: 20,
    textAlign: "center",
  },

  createBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF7A00",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
    gap: 6,
  },

  createText: {
    color: "#000",
    fontWeight: "600",
  },
});