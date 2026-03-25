import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

import { useState } from "react";

import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import DateTimePicker from "@react-native-community/datetimepicker";


const members = [
  {
    id: "1",
    name: "Vikram Singh",
    status: "active",
    phone: "+91 98765 11111",
    plan: "Annual Platinum",
    expiry: "Expires 09 Jan 2025",
    initials: "VS",
  },
  {
    id: "2",
    name: "Ananya Gupta",
    status: "active",
    phone: "+91 98765 22222",
    plan: "Quarterly Premium",
    expiry: "Expires 31 Mar 2024",
    initials: "AG",
  },
  {
    id: "3",
    name: "Karthik Menon",
    status: "active",
    phone: "+91 98765 33333",
    plan: "Monthly Basic",
    expiry: "Expires 14 Feb 2024",
    initials: "KM",
  },
  {
    id: "4",
    name: "Deepika Rao",
    status: "expired",
    phone: "+91 98765 44444",
    initials: "DR",
  },
];


export default function MembersScreen() {

  const { width } = useWindowDimensions();

  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);


  const filteredMembers = members.filter((item) => {

    const statusMatch =
      selectedStatus === "All" ||
      item.status.toLowerCase() === selectedStatus.toLowerCase();

    return statusMatch;

  });


  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Members</Text>
          <Text style={styles.subtitle}>{members.length} members</Text>
        </View>

        <TouchableOpacity onPress={() => setFilterVisible(true)}>
          <MaterialCommunityIcons name="filter-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#777" />
        <TextInput
          placeholder="Search by name, phone, or email..."
          placeholderTextColor="#777"
          style={styles.searchInput}
        />
      </View>

      {/* Members List */}
      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MemberCard item={item} width={width} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />


      {/* FILTER MODAL */}

      <Modal visible={filterVisible} transparent animationType="fade">

        <View style={styles.modalOverlay}>

          <View style={styles.modalContainer}>

            <Text style={styles.modalTitle}>Filter Members</Text>

            {/* STATUS FILTER */}

            <Text style={styles.modalLabel}>Status</Text>

            {["All","Active","Expired","Inactive"].map((status) => (

              <TouchableOpacity
                key={status}
                style={[
                  styles.option,
                  selectedStatus === status && styles.selectedOption
                ]}
                onPress={()=>setSelectedStatus(status)}
              >
                <Text style={styles.optionText}>{status}</Text>
              </TouchableOpacity>

            ))}


            {/* DATE FILTER */}

            <Text style={styles.modalLabel}>Start Date</Text>

            <TouchableOpacity
              style={styles.dateInput}
              onPress={()=>setShowStartPicker(true)}
            >
              <Ionicons name="calendar-outline" size={18} color="#aaa"/>
              <Text style={styles.dateText}>
                {startDate ? startDate.toLocaleDateString("en-GB") : "Select start date"}
              </Text>
            </TouchableOpacity>


            <Text style={styles.modalLabel}>End Date</Text>

            <TouchableOpacity
              style={styles.dateInput}
              onPress={()=>setShowEndPicker(true)}
            >
              <Ionicons name="calendar-outline" size={18} color="#aaa"/>
              <Text style={styles.dateText}>
                {endDate ? endDate.toLocaleDateString("en-GB") : "Select end date"}
              </Text>
            </TouchableOpacity>


            {/* BUTTONS */}

            <View style={styles.filterButtonRow}>

              <TouchableOpacity
                style={styles.clearBtn}
                onPress={()=>{
                  setSelectedStatus("All");
                  setStartDate(null);
                  setEndDate(null);
                }}
              >
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyBtn}
                onPress={()=>setFilterVisible(false)}
              >
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>


      {/* DATE PICKERS */}

      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={(e,date)=>{
            setShowStartPicker(false);
            if(date) setStartDate(date);
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={(e,date)=>{
            setShowEndPicker(false);
            if(date) setEndDate(date);
          }}
        />
      )}

    </View>
  );
}


function MemberCard({ item, width }) {

  const router = useRouter();
  const isActive = item.status === "active";

  return (
    <TouchableOpacity
      style={[styles.card, { width: width - 32 }]}
      onPress={() =>
        router.push({
          pathname: "/member-details",
          params: item,
        })
      }
    >
      <View style={styles.row}>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.initials}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{item.name}</Text>

            <View
              style={[
                styles.badge,
                { backgroundColor: isActive ? "#123524" : "#3a1111" },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  { color: isActive ? "#3DDB84" : "#FF3B30" },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={14} color="#777" />
            <Text style={styles.infoText}>{item.phone}</Text>
          </View>

          {item.plan && (
            <View style={styles.infoRow}>
              <MaterialIcons name="work-outline" size={14} color="#FF9800" />
              <Text style={styles.planText}>
                {item.plan} <Text style={styles.expiry}>{item.expiry}</Text>
              </Text>
            </View>
          )}
        </View>

        <Ionicons name="chevron-forward" size={18} color="#555" />
      </View>
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

  card: {
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    alignSelf: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#1C1C1E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#FF9800",
    fontWeight: "bold",
  },

  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "lowercase",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },

  infoText: {
    color: "#777",
    fontSize: 12,
  },

  planText: {
    color: "#aaa",
    fontSize: 12,
  },

  expiry: {
    color: "#777",
  },

  modalOverlay:{
flex:1,
backgroundColor:"rgba(0,0,0,0.7)",
justifyContent:"center",
padding:20
},

modalContainer:{
backgroundColor:"#111",
borderRadius:16,
padding:20
},

modalTitle:{
color:"#fff",
fontSize:18,
fontWeight:"600",
marginBottom:15
},

modalLabel:{
color:"#aaa",
fontSize:13,
marginBottom:6,
marginTop:10
},

option:{
backgroundColor:"#1C1C1E",
padding:12,
borderRadius:10,
marginBottom:8
},

selectedOption:{
borderWidth:1,
borderColor:"#FF9800"
},

optionText:{
color:"#fff",
fontSize:14
},

dateInput:{
flexDirection:"row",
alignItems:"center",
gap:8,
backgroundColor:"#1C1C1E",
padding:12,
borderRadius:10,
marginBottom:10
},

dateText:{
color:"#aaa",
fontSize:13
},

filterButtonRow:{
flexDirection:"row",
justifyContent:"space-between",
marginTop:10
},

clearBtn:{
backgroundColor:"#1C1C1E",
paddingVertical:12,
borderRadius:10,
width:"48%",
alignItems:"center"
},

clearText:{
color:"#aaa",
fontWeight:"600"
},

applyBtn:{
backgroundColor:"#FF9800",
paddingVertical:12,
borderRadius:10,
width:"48%",
alignItems:"center"
},

applyText:{
color:"#fff",
fontWeight:"600"
}
});