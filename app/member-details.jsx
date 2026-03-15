import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Modal, TextInput } from "react-native";

const onDateChange = (event, selectedDate) => {
  setShowDatePicker(false);
  if (selectedDate) setFollowDate(selectedDate);
};

const onTimeChange = (event, selectedTime) => {
  setShowTimePicker(false);
  if (selectedTime) setFollowTime(selectedTime);
};

const formatDate = (date) => {
  if (!date) return "Select date";
  return date.toLocaleDateString("en-GB");
};

const formatTime = (time) => {
  if (!time) return "--:--";
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function MemberDetails() {
  const router = useRouter();
  const member = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [followModalVisible, setFollowModalVisible] = useState(false);
  const isActive = member.status === "active";

  const [followDate, setFollowDate] = useState(null);
  const [followTime, setFollowTime] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Member Details</Text>
      </View>

      {/* PROFILE CARD */}
      <View style={styles.profileCard}>
        <View style={styles.orangeBanner} />

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{member.initials}</Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{member.name}</Text>

          <View
            style={[
              styles.statusBadge,
              { backgroundColor: isActive ? "#123524" : "#3a1111" },
            ]}
          >
            <Text
              style={{
                color: isActive ? "#3DDB84" : "#FF3B30",
                fontSize: 12,
              }}
            >
              {member.status}
            </Text>
          </View>
        </View>

        <Text style={styles.memberSince}>Member since January 2023</Text>
      </View>

      {/* TAB BAR */}
      <View style={styles.tabBar}>
        <TabIcon
          icon="person-outline"
          active={activeTab === "profile"}
          onPress={() => setActiveTab("profile")}
        />

        <TabIcon
          icon="card-outline"
          active={activeTab === "membership"}
          onPress={() => setActiveTab("membership")}
        />

        <TabIcon
          icon="time-outline"
          active={activeTab === "history"}
          onPress={() => setActiveTab("history")}
        />

        <TabIcon
          icon="chatbubble-outline"
          active={activeTab === "notes"}
          onPress={() => setActiveTab("notes")}
        />
      </View>

      {activeTab === "profile" && (
  <View style={styles.card}>
    {/* CONTACT INFORMATION */}
    <Text style={styles.sectionTitle}>CONTACT INFORMATION</Text>

    <InfoRow icon="mail-outline" label="Email" value="vikram.s@email.com" />
    <InfoRow icon="call-outline" label="Phone" value={member.phone} />
    <InfoRow icon="location-outline" label="Address" value="42, MG Road, Bangalore" />
    <InfoRow icon="calendar-outline" label="Date of Birth" value="15 May 1990" />
    <InfoRow icon="heart-outline" label="Emergency Contact" value="+91 98765 00000" />
  </View>
)}

{activeTab === "membership" && (
  <>
  <View style={styles.planCard}>
    
    <View style={styles.planHeader}>
      <Text style={styles.planTitle}>Current Plan</Text>

      <View style={styles.activeBadge}>
        <Text style={styles.activeText}>Active</Text>
      </View>
    </View>

    <View style={styles.planBox}>
      <Text style={styles.planName}>Annual Platinum</Text>
    </View>

    <View style={styles.dateRow}>
      
      <View style={styles.dateBox}>
        <Text style={styles.dateLabel}>Start Date</Text>
        <Text style={styles.startDate}>10 Jan 2024</Text>
      </View>

      <View style={styles.dateBox}>
        <Text style={styles.dateLabel}>End Date</Text>
        <Text style={styles.endDate}>09 Jan 2025</Text>
      </View>

    </View>

  </View>

  {/* PAYMENT RECEIPTS */}
  <View style={styles.card}>
    <Text style={styles.sectionTitle}>PAYMENT RECEIPTS</Text>

    <View style={styles.paymentCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.plan}>Annual Platinum</Text>
        <Text style={styles.date}>Date: 10 Jan 2024</Text>
      </View>

      <View style={styles.shareBox}>
        <Feather name="share-2" size={16} color="#FF7A00" />
        <Text style={styles.shareText}>Share</Text>
      </View>

      <Text style={styles.amount}>Amount: ₹11000</Text>
    </View>
  </View>
  </>
)}

{activeTab === "history" && (
  <View style={styles.card}>
    <Text style={styles.sectionTitle}>MEMBERSHIP HISTORY</Text>

    {/* PLAN 1 */}
    <View style={styles.historyCard}>
      <View style={{flex:1}}>
        <Text style={styles.historyPlan}>Annual Platinum</Text>
        <Text style={styles.historyDuration}>
          Duration: 10 Jan 24 - 09 Jan 25
        </Text>
      </View>

      <View style={styles.historyRight}>
        <View style={styles.activeBadge}>
          <Text style={styles.activeText}>active</Text>
        </View>

        <Text style={styles.historyPaid}>
          Paid: ₹11000 <Text style={styles.discount}>(₹1000 off)</Text>
        </Text>
      </View>
    </View>

    {/* PLAN 2 */}
    <View style={styles.historyCard}>
      <View style={{flex:1}}>
        <Text style={styles.historyPlan}>Half Yearly Gold</Text>
        <Text style={styles.historyDuration}>
          Duration: 10 Jul 23 - 09 Jan 24
        </Text>
      </View>

      <View style={styles.historyRight}>
        <View style={styles.expiredBadge}>
          <Text style={styles.expiredText}>expired</Text>
        </View>

        <Text style={styles.historyPaid}>Paid: ₹7500</Text>
      </View>
    </View>

    {/* PLAN 3 */}
    <View style={styles.historyCard}>
      <View style={{flex:1}}>
        <Text style={styles.historyPlan}>Quarterly Premium</Text>
        <Text style={styles.historyDuration}>
          Duration: 10 Jan 23 - 09 Jul 23
        </Text>
      </View>

      <View style={styles.historyRight}>
        <View style={styles.expiredBadge}>
          <Text style={styles.expiredText}>expired</Text>
        </View>

        <Text style={styles.historyPaid}>
          Paid: ₹3500 <Text style={styles.discount}>(₹500 off)</Text>
        </Text>
      </View>
    </View>

  </View>
)}

{activeTab === "notes" && (
  <>

  {/* ADD FOLLOW-UP BUTTON */}
  <TouchableOpacity
  style={styles.followBtn}
  onPress={() => {
    setFollowModalVisible(true);
    setShowDatePicker(false);
    setShowTimePicker(false);
  }}
>
  <Ionicons name="add" size={18} color="#fff" />
  <Text style={styles.followBtnText}>Add Follow-up</Text>
</TouchableOpacity>

{showDatePicker && (
  <DateTimePicker
    value={followDate || new Date()}
    mode="date"
    display="default"
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) setFollowDate(selectedDate);
    }}
  />
)}

{showTimePicker && (
  <DateTimePicker
    value={followTime || new Date()}
    mode="time"
    display="default"
    onChange={(event, selectedTime) => {
      setShowTimePicker(false);
      if (selectedTime) setFollowTime(selectedTime);
    }}
  />
)}

  {/* FOLLOW-UP CARD */}
  <View style={styles.noteCard}>

    <View style={styles.noteIcon}>
      <Ionicons name="chatbubble-outline" size={18} color="#FF7A00" />
    </View>

    <View style={{flex:1}}>
      <Text style={styles.noteText}>
        Called to check on progress. Very happy with personal training sessions.
      </Text>

      <View style={styles.noteFooter}>
        
        <View style={styles.noteTime}>
          <Ionicons name="time-outline" size={14} color="#888" />
          <Text style={styles.noteDate}>25 Jan 2024, 10:00 AM</Text>
        </View>

        <View style={styles.nextBadge}>
          <Text style={styles.nextText}>Next: 07 Feb</Text>
        </View>

      </View>
    </View>

  </View>

  </>
)}
<Modal
  visible={followModalVisible}
  animationType="fade"
  transparent
>
<View style={styles.modalOverlay}>

<View style={styles.modalContainer}>

<View style={styles.modalHeader}>
<Text style={styles.modalTitle}>Add Follow-up</Text>

<TouchableOpacity onPress={() => setFollowModalVisible(false)}>
<Ionicons name="close" size={22} color="#aaa" />
</TouchableOpacity>
</View>

<Text style={styles.modalLabel}>Note *</Text>

<TextInput
placeholder="Enter follow-up notes..."
placeholderTextColor="#777"
style={styles.modalInput}
multiline
/>

<Text style={styles.modalLabel}>Next Follow-up Date (Optional)</Text>

<TouchableOpacity
  style={styles.dateInput}
  onPress={() => setShowDatePicker(true)}
>
  <Ionicons name="calendar-outline" size={18} color="#aaa" />
  <Text style={styles.dateText}>
    {followDate ? formatDate(followDate) : "Select date"}
  </Text>
</TouchableOpacity>

<Text style={styles.modalLabel}>Follow-up Time (Optional)</Text>

<TouchableOpacity
  style={styles.dateInput}
  onPress={() => setShowTimePicker(true)}
>
  <Ionicons name="time-outline" size={18} color="#aaa" />
  <Text style={styles.dateText}>
    {followTime ? formatTime(followTime) : "--:--"}
  </Text>
</TouchableOpacity>

<TouchableOpacity style={styles.saveBtn}>
<Text style={styles.saveBtnText}>Save Follow-up</Text>
</TouchableOpacity>

</View>

</View>
</Modal>
    </ScrollView>
  );
}

/* ---------- TAB ICON ---------- */

function TabIcon({ icon, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.tabIcon, active && styles.activeTab]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={18} color={active ? "#fff" : "#777"} />
    </TouchableOpacity>
  );
}

/* ---------- CONTACT ROW ---------- */

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={18} color="#FF7A00" />
      </View>

      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
    gap: 10,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  profileCard: {
    backgroundColor: "#151515",
    borderRadius: 18,
    paddingBottom: 20,
    marginBottom: 16,
    overflow: "hidden",
  },

  orangeBanner: {
    height: 60,
    backgroundColor: "#FF7A00",
  },

  avatar:{
    width:100,
    height:100,
    borderRadius:52,
    backgroundColor:"#FF7A00",
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    top:32,
    left:20,
    borderWidth:4,
    borderColor:"#151515",
    elevation:5
    },

  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 32,
  },

  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginLeft: 125,
    gap: 8,
  },

  name: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },

  memberSince: {
    color: "#aaa",
    marginLeft: 125,
    marginTop: 4,
  },

  tabBar: {
    flexDirection: "row",
    backgroundColor: "#151515",
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    justifyContent: "space-around",
  },

  tabIcon: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  activeTab: {
    backgroundColor: "#FF7A00",
  },

  card: {
    backgroundColor: "#151515",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },

  sectionTitle: {
    color: "#888",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 12,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
  },

  infoLabel: {
    color: "#888",
    fontSize: 12,
  },

  infoValue: {
    color: "#fff",
    fontSize: 14,
  },

  paymentCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 14,
  },

  plan: {
    color: "#fff",
    fontWeight: "600",
  },

  date: {
    color: "#aaa",
    marginTop: 4,
  },

  shareBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    position: "absolute",
    right: 14,
    top: 14,
  },

  shareText: {
    color: "#FF7A00",
    fontSize: 12,
  },

  amount: {
    color: "#aaa",
    marginTop: 10,
  },
  planCard:{
backgroundColor:"#151515",
borderRadius:18,
padding:16,
borderWidth:1,
borderColor:"#FF7A00",
marginBottom:16
},

planHeader:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:16
},

planTitle:{
color:"#fff",
fontSize:16,
fontWeight:"600"
},

activeBadge:{
backgroundColor:"#123524",
paddingHorizontal:10,
paddingVertical:4,
borderRadius:12
},

activeText:{
color:"#3DDB84",
fontSize:12
},

planBox:{
backgroundColor:"#1E1E1E",
padding:18,
borderRadius:12,
marginBottom:16
},

planName:{
color:"#FF7A00",
fontSize:18,
fontWeight:"600"
},

dateRow:{
flexDirection:"row",
justifyContent:"space-between"
},

dateBox:{
backgroundColor:"#1E1E1E",
padding:16,
borderRadius:12,
width:"48%"
},

dateLabel:{
color:"#888",
fontSize:12,
marginBottom:6
},

startDate:{
color:"#3DDB84",
fontSize:14
},

endDate:{
color:"#FF3B30",
fontSize:14
},

historyCard:{
backgroundColor:"#1E1E1E",
borderRadius:14,
padding:16,
marginBottom:14,
borderLeftWidth:2,
borderLeftColor:"#FF7A00",
flexDirection:"row"
},

historyPlan:{
color:"#fff",
fontSize:15,
fontWeight:"600",
marginBottom:4
},

historyDuration:{
color:"#aaa",
fontSize:12
},

historyRight:{
alignItems:"flex-end",
justifyContent:"space-between"
},

historyPaid:{
color:"#fff",
fontSize:13,
marginTop:8
},

discount:{
color:"#3DDB84"
},

expiredBadge:{
backgroundColor:"#3a1111",
paddingHorizontal:10,
paddingVertical:4,
borderRadius:12
},

expiredText:{
color:"#FF3B30",
fontSize:12
},

followBtn:{
backgroundColor:"#FF7A00",
borderRadius:12,
paddingVertical:14,
justifyContent:"center",
alignItems:"center",
flexDirection:"row",
gap:6,
marginBottom:16
},

followBtnText:{
color:"#fff",
fontWeight:"600",
fontSize:15
},

noteCard:{
backgroundColor:"#151515",
borderRadius:16,
padding:16,
flexDirection:"row",
gap:12,
borderWidth:1,
borderColor:"#2a2a2a"
},

noteIcon:{
width:40,
height:40,
borderRadius:10,
backgroundColor:"#1E1E1E",
justifyContent:"center",
alignItems:"center"
},

noteText:{
color:"#fff",
fontSize:14,
marginBottom:10
},

noteFooter:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
},

noteTime:{
flexDirection:"row",
alignItems:"center",
gap:4
},

noteDate:{
color:"#888",
fontSize:12
},

nextBadge:{
backgroundColor:"#3a2b00",
paddingHorizontal:10,
paddingVertical:4,
borderRadius:10
},

nextText:{
color:"#FFC107",
fontSize:12
},

modalOverlay:{
flex:1,
backgroundColor:"rgba(0,0,0,0.7)",
justifyContent:"center",
padding:20
},

modalContainer:{
backgroundColor:"#151515",
borderRadius:16,
padding:20
},

modalHeader:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:15
},

modalTitle:{
color:"#fff",
fontSize:18,
fontWeight:"600"
},

modalLabel:{
color:"#aaa",
fontSize:13,
marginBottom:6,
marginTop:10
},

modalInput:{
backgroundColor:"#1E1E1E",
borderRadius:12,
padding:14,
color:"#fff",
borderWidth:1,
borderColor:"#FF7A00",
height:90,
textAlignVertical:"top"
},

dateInput:{
flexDirection:"row",
alignItems:"center",
gap:8,
backgroundColor:"#1E1E1E",
padding:14,
borderRadius:12,
marginTop:6
},

dateText:{
color:"#aaa"
},

saveBtn:{
backgroundColor:"#FF7A00",
borderRadius:12,
paddingVertical:14,
alignItems:"center",
marginTop:20
},

saveBtnText:{
color:"#fff",
fontWeight:"600",
fontSize:15
}
});