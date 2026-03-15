import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>My Profile</Text>

      {/* Profile Card */}
      <View style={[styles.profileCard, { width: width - 32 }]}>
        <View style={styles.orangeStrip} />

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>RS</Text>
        </View>

        <Text style={styles.name}>Rahul Sharma</Text>

        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>Sales Executive</Text>
        </View>
      </View>

      {/* Status Card */}
      <View style={[styles.statusCard, { width: width - 32 }]}>
        <View style={styles.statusRow}>
          <View style={styles.statusIcon}>
            <Ionicons name="time-outline" size={22} color="#888" />
          </View>

          <View>
            <Text style={styles.statusLabel}>Status</Text>
            <Text style={styles.statusValue}>CLOCKED OUT</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.clockInBtn}>
            <Ionicons name="log-in-outline" size={18} color="#000" />
            <Text style={styles.clockInText}>Clock In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.historyBtn}>
            <Ionicons name="refresh-outline" size={18} color="#fff" />
            <Text style={styles.historyText}>History</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contact Details */}
      <View style={[styles.detailsCard, { width: width - 32 }]}>
        <Text style={styles.detailsHeader}>CONTACT DETAILS</Text>

        <DetailItem icon="mail-outline" label="Email" value="abc@gmail.com" />
        <DetailItem icon="call-outline" label="Phone" value="+91 98765 43210" />
        <DetailItem icon="briefcase-outline" label="Role" value="Sales Executive" />
        <DetailItem icon="calendar-outline" label="Join Date" value="15 Jun 2023" />
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.logoutBtn, { width: width - 32 }]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={18} color="#FF3B30" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <View style={styles.detailItem}>
      <View style={styles.detailIcon}>
        <Ionicons name={icon} size={18} color="#FF9800" />
      </View>

      <View>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
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
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  profileCard: {
    backgroundColor: "#111",
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    paddingBottom: 20,
    marginBottom: 18,
    overflow: "hidden",
  },

  orangeStrip: {
    backgroundColor: "#FF9800",
    height: 70,
    width: "100%",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -45,
    borderWidth: 4,
    borderColor: "#111",
  },

  avatarText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },

  roleBadge: {
    backgroundColor: "#1C1C1E",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    marginTop: 6,
  },

  roleText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  statusCard: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 16,
    alignSelf: "center",
    marginBottom: 18,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 12,
  },

  statusIcon: {
    backgroundColor: "#1C1C1E",
    padding: 12,
    borderRadius: 14,
  },

  statusLabel: {
    color: "#888",
    fontSize: 12,
  },

  statusValue: {
    color: "#aaa",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 2,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  clockInBtn: {
    backgroundColor: "#FF9800",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    flex: 1,
    height: 44,
    borderRadius: 12,
    marginRight: 10,
  },

  clockInText: {
    color: "#000",
    fontWeight: "600",
  },

  historyBtn: {
    backgroundColor: "#1C1C1E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    flex: 1,
    height: 44,
    borderRadius: 12,
  },

  historyText: {
    color: "#fff",
    fontWeight: "600",
  },

  detailsCard: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 18,
    alignSelf: "center",
    marginBottom: 18,
  },

  detailsHeader: {
    color: "#888",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 14,
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 12,
  },

  detailIcon: {
    backgroundColor: "#1C1C1E",
    padding: 10,
    borderRadius: 12,
  },

  detailLabel: {
    color: "#888",
    fontSize: 12,
  },

  detailValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },

  logoutBtn: {
    borderWidth: 1,
    borderColor: "#FF3B30",
    height: 48,
    borderRadius: 14,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },

  logoutText: {
    color: "#FF3B30",
    fontWeight: "600",
  },
});