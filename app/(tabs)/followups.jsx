import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    TextInput,
    useWindowDimensions
} from "react-native";

export default function FollowUpsScreen() {
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState("today");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Follow-ups</Text>
          <Text style={styles.subtitle}>
            Manage all your follow-ups
          </Text>
        </View>

        <TouchableOpacity>
          <MaterialCommunityIcons
  name="filter-outline"
  size={22}
  color="#fff"
/>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#777" />
        <TextInput
          placeholder="Search by name, phone, or note..."
          placeholderTextColor="#777"
          style={styles.searchInput}
        />
      </View>

      {/* Tabs */}
      <View style={[styles.tabContainer, { width: width - 32 }]}>
        <TabButton
          label="Today"
          isActive={activeTab === "today"}
          onPress={() => setActiveTab("today")}
        />

        <TabButton
          label="Tomorrow"
          isActive={activeTab === "tomorrow"}
          onPress={() => setActiveTab("tomorrow")}
        />

        <TabButton
          label="Missed"
          count={3}
          isActive={activeTab === "missed"}
          onPress={() => setActiveTab("missed")}
        />
      </View>

      {/* Empty State */}
      <View style={[styles.emptyCard, { width: width - 32 }]}>
        <Ionicons name="calendar-outline" size={50} color="#777" />
        <Text style={styles.emptyText}>
          No follow-ups scheduled for today
        </Text>
      </View>
    </View>
  );
}

function TabButton({ label, isActive, onPress, count }) {
  return (
    <TouchableOpacity
      style={[
        styles.tabButton,
        isActive && styles.activeTab,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.tabText,
          isActive && styles.activeTabText,
        ]}
      >
        {label}
      </Text>

      {count && (
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
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
    marginBottom: 18,
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

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    marginBottom: 18,
  },

  searchInput: {
    color: "#fff",
    marginLeft: 10,
    flex: 1,
    fontSize: 13,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#1C1C1E",
    borderRadius: 14,
    padding: 4,
    alignSelf: "center",
    marginBottom: 18,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  activeTab: {
    backgroundColor: "#000",
  },

  tabText: {
    color: "#aaa",
    fontSize: 13,
    fontWeight: "600",
  },

  activeTabText: {
    color: "#fff",
  },

  countBadge: {
    backgroundColor: "#3a1111",
    paddingHorizontal: 6,
    borderRadius: 8,
  },

  countText: {
    color: "#FF3B30",
    fontSize: 11,
    fontWeight: "600",
  },

  emptyCard: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    color: "#888",
    marginTop: 14,
    textAlign: "center",
  },
});