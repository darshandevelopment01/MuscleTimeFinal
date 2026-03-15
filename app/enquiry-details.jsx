import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EnquiryDetails() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("details");
  const [lostModalVisible, setLostModalVisible] = useState(false);
  const [followModalVisible, setFollowModalVisible] = useState(false);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (lostModalVisible || followModalVisible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);
    }
  }, [lostModalVisible, followModalVisible]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enquiry Details</Text>
        </View>

        {/* TABS */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "details" && styles.activeTab]}
            onPress={() => setActiveTab("details")}
          >
            <Text style={activeTab === "details" ? styles.activeTabText : styles.tabText}>
              Details
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "followups" && styles.activeTab]}
            onPress={() => setActiveTab("followups")}
          >
            <Text style={activeTab === "followups" ? styles.activeTabText : styles.tabText}>
              Follow-ups (1)
            </Text>
          </TouchableOpacity>
        </View>

        {/* DETAILS TAB */}
        {activeTab === "details" && (
          <>
            <View style={styles.card}>
              <Text style={styles.name}>Priya Patel</Text>

              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>pending</Text>
              </View>

              <InfoRow icon="call-outline" label="Phone" value="+91 99887 65432" />
              <InfoRow icon="mail-outline" label="Email" value="priya@email.com" />
              <InfoRow icon="pricetag-outline" label="Interest" value="Weight Loss Program" />
              <InfoRow icon="chatbubble-outline" label="Notes" value="Interested in morning batch" />
            </View>

            <TouchableOpacity
              style={styles.convertBtn}
              onPress={() => router.push("/convert-member")}
            >
              <Ionicons name="person-add-outline" size={18} color="#000" />
              <Text style={styles.convertText}>Convert to Member</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.lostBtn}
              onPress={() => setLostModalVisible(true)}
            >
              <Ionicons name="close-circle-outline" size={18} color="#FF3B30" />
              <Text style={styles.lostText}>Mark as Lost</Text>
            </TouchableOpacity>
          </>
        )}

        {/* FOLLOWUPS TAB */}
        {activeTab === "followups" && (
          <>
            <TouchableOpacity
              style={styles.addFollowBtn}
              onPress={() => setFollowModalVisible(true)}
            >
              <Ionicons name="add" size={18} color="#000" />
              <Text style={styles.addFollowText}>Add Follow-up</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>PENDING (1)</Text>

            <View style={styles.card}>
              <Text style={styles.followText}>
                Called and discussed morning batch timing.
                She is interested in joining next week.
              </Text>

              <View style={styles.followMeta}>
                <Text style={styles.metaText}>29 Jan 2024</Text>
                <View style={styles.nextBadge}>
                  <Text style={styles.nextText}>Next: 06 Feb</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.completeBtn}>
                <Ionicons name="checkmark-circle-outline" size={16} color="#00C853" />
                <Text style={styles.completeText}>Mark Complete</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      {/* BLUR BACKGROUND LAYER */}
      {(lostModalVisible || followModalVisible) && (
        <BlurView intensity={70} tint="dark" style={StyleSheet.absoluteFill} />
      )}

      {/* MARK LOST MODAL */}
      <Modal transparent visible={lostModalVisible} animationType="none">
        <View style={styles.modalWrapper}>
          <Pressable style={styles.overlay} onPress={() => setLostModalVisible(false)} />
          <Animated.View style={[styles.modalBox, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]}>
            <Text style={styles.modalTitle}>Mark Enquiry as Lost</Text>

            <Text style={styles.modalLabel}>Reason for Lost *</Text>

            <View style={styles.dropdown}>
              <Text style={{ color: "#aaa" }}>Select a reason</Text>
              <Ionicons name="chevron-down" size={18} color="#aaa" />
            </View>

            <TouchableOpacity style={styles.redBtn}>
              <Text style={styles.redBtnText}>Confirm Lost</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* ADD FOLLOWUP MODAL */}
      <Modal transparent visible={followModalVisible} animationType="none">
        <View style={styles.modalWrapper}>
          <Pressable style={styles.overlay} onPress={() => setFollowModalVisible(false)} />
          <Animated.View style={[styles.modalBox, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]}>
            <Text style={styles.modalTitle}>Add Follow-up</Text>

            <Text style={styles.modalLabel}>Note *</Text>
            <TextInput
              placeholder="Enter follow-up notes..."
              placeholderTextColor="#777"
              style={styles.textArea}
              multiline
            />

            {/* Date */}
            <Text style={styles.modalLabel}>Next Follow-up Date *</Text>
            <TouchableOpacity
            style={styles.inputBox}
            onPress={() => setShowDatePicker(true)}
            >
            <Ionicons name="calendar-outline" size={18} color="#aaa" />
            <Text style={styles.inputText}>
                {date.toDateString()}
            </Text>
            </TouchableOpacity>

            {/* Time */}
            <Text style={styles.modalLabel}>Follow-up Time *</Text>
            <TouchableOpacity
            style={styles.inputBox}
            onPress={() => setShowTimePicker(true)}
            >
  <Text style={styles.inputText}>
    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
  </Text>
  <Ionicons name="time-outline" size={18} color="#aaa" />
</TouchableOpacity>

            <TouchableOpacity style={styles.orangeBtn}>
              <Text style={styles.orangeBtnText}>Save Follow-up</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        {showDatePicker && (
  <DateTimePicker
    value={date}
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) setDate(selectedDate);
    }}
  />
)}

{showTimePicker && (
  <DateTimePicker
    value={time}
    mode="time"
    is24Hour={false}
    display="default"
    onChange={(event, selectedTime) => {
      setShowTimePicker(false);
      if (selectedTime) setTime(selectedTime);
    }}
  />
)}
      </Modal>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={18} color="#FF7A00" />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },

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

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#111",
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },

  tabBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },

  activeTab: { backgroundColor: "#FF7A00" },

  tabText: { color: "#aaa" },

  activeTabText: { color: "#000", fontWeight: "600" },

  card: {
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  statusBadge: {
    backgroundColor: "#332200",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 15,
  },

  statusText: { color: "#FFB800", fontSize: 12 },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  infoLabel: { color: "#777", fontSize: 12 },

  infoValue: { color: "#fff", fontSize: 14 },

  convertBtn: {
    backgroundColor: "#FF7A00",
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 15,
  },

  convertText: { color: "#000", fontWeight: "600" },

  lostBtn: {
    borderWidth: 1,
    borderColor: "#FF3B30",
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  lostText: { color: "#FF3B30", fontWeight: "600" },

  addFollowBtn: {
    backgroundColor: "#FF7A00",
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
  },

  addFollowText: { color: "#000", fontWeight: "600" },

  sectionTitle: {
    color: "#777",
    marginBottom: 10,
    fontWeight: "600",
  },

  followText: { color: "#fff", marginBottom: 10 },

  followMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  metaText: { color: "#777", fontSize: 12 },

  nextBadge: {
    backgroundColor: "#332200",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },

  nextText: { color: "#FFB800", fontSize: 12 },

  completeBtn: {
    borderWidth: 1,
    borderColor: "#00C853",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  completeText: { color: "#00C853", fontWeight: "600" },

  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalBox: {
    width: "90%",
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 20,
  },

  modalTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },

  modalLabel: {
    color: "#ccc",
    marginBottom: 6,
    marginTop: 10,
  },

  dropdown: {
    backgroundColor: "#1C1C1E",
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textArea: {
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    padding: 14,
    height: 100,
    color: "#fff",
  },

  inputBox: {
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inputText: { color: "#aaa" },

  orangeBtn: {
    backgroundColor: "#FF7A00",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },

  orangeBtnText: { color: "#000", fontWeight: "600" },

  redBtn: {
    backgroundColor: "#8B1E1E",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  redBtnText: { color: "#fff", fontWeight: "600" },
});