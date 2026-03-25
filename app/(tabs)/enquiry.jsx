import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Enquiry() {
  const API_URL = "https://muscletime-backend.vercel.app/api";
//   useEffect(() => {
//   fetchEnquiries();
// }, []);
useFocusEffect(
  useCallback(() => {
    fetchEnquiries();
  }, [])
);
  const router = useRouter();
  const [enquiries, setEnquiries] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedSource, setSelectedSource] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const fetchEnquiries = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch(`${API_URL}/enquiries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    console.log("API RESPONSE:", data);

    if (data.success) {
      setEnquiries(data.data); // ✅ IMPORTANT
    } else {
      console.log("Error:", data.message);
    }

  } catch (err) {
    console.log("Fetch error:", err);
  }
};
  const onStartDateChange = (event, selectedDate) => {
  setShowStartPicker(false);
  if (selectedDate) setStartDate(selectedDate);
};

  const onEndDateChange = (event, selectedDate) => {
  setShowEndPicker(false);
  if (selectedDate) setEndDate(selectedDate);
};
const formatDate = (date) => {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// const filteredEnquiries = (enquiries || []).filter((item) => {
//   const statusMatch =
//     selectedStatus === "All" || item.status === selectedStatus;

//   const sourceMatch =
//     selectedSource === "All" || item.source === selectedSource;

//   const dateMatch =
//     (!startDate || new Date(item.date) >= startDate) &&
//     (!endDate || new Date(item.date) <= endDate);

//   return statusMatch && sourceMatch && dateMatch;
// });

  // const enquiries = [
  //   {
  //     id: 1,
  //     name: "Priya Patel",
  //     status: "pending",
  //     interest: "Weight Loss Program",
  //     phone: "+91 99887 65432",
  //     date: "29 Jan, 10:30 AM",
  //     source: "Walk-in",
  //   },
  //   {
  //     id: 2,
  //     name: "Amit Kumar",
  //     status: "pending",
  //     interest: "Muscle Building",
  //     phone: "+91 88776 54321",
  //     date: "28 Jan, 02:00 PM",
  //     source: "Social Media",
  //   },
  //   {
  //     id: 3,
  //     name: "Sneha Reddy",
  //     status: "pending",
  //     interest: "Yoga Classes",
  //     phone: "+91 77665 43210",
  //     date: "27 Jan, 11:15 AM",
  //     source: "Referral",
  //   },
  //   {
  //     id: 4,
  //     name: "Rajesh Nair",
  //     status: "confirmed",
  //     interest: "General Fitness",
  //     phone: "+91 66554 32109",
  //     date: "29 Jan, 09:00 AM",
  //     source: "Website",
  //   },
  // ];

//   const filteredData = enquiries.filter((item) => {
//     const statusMatch =
//       selectedStatus === "All" ||
//       item.status.toLowerCase() === selectedStatus.toLowerCase();

//     const sourceMatch =
//       selectedSource === "All" || item.source === selectedSource;

//     const formatDate = (date) => {
//   if (!date) return "";

//   const day = ("0" + date.getDate()).slice(-2);
//   const month = ("0" + (date.getMonth() + 1)).slice(-2);
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// };
//     return statusMatch && sourceMatch;
//   });
const filteredData = enquiries.filter((item) => {
  const statusMatch =
    selectedStatus === "All" ||
    item.status?.toLowerCase() === selectedStatus.toLowerCase();

  const sourceMatch =
    selectedSource === "All" || item.source === selectedSource;

  return statusMatch && sourceMatch;
});
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
  router.push({
    pathname: "/enquiry-details",
    params: {
      enquiry: JSON.stringify(item),
    },
  })
}
    >
      <View style={styles.rowTop}>
        <Text style={styles.name}>{item.name}</Text>

        <View
          style={[
            styles.badge,
            item.status === "confirmed"
              ? styles.confirmedBadge
              : styles.pendingBadge,
          ]}
        >
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>

      {/* <Text style={styles.interest}>{item.interest}</Text> */}
      <Text style={styles.interest}>{item?.email}</Text>
      <View style={styles.rowBottom}>
        <View style={styles.phoneRow}>
          <Ionicons name="call-outline" size={14} color="#888" />
          {/* <Text style={styles.phone}>{item.phone}</Text> */}
          <Text style={styles.phone}>{item.mobileNumber}</Text>
        </View>

        <View style={styles.phoneRow}>
          <Ionicons name="time-outline" size={14} color="#888" />
          {/* <Text style={styles.phone}>{item.date}</Text> */}
          <Text style={styles.phone}>
  {new Date(item.createdAt).toLocaleDateString("en-GB")}
</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Enquiries</Text>
            <Text style={styles.subtitle}>
              {filteredData.length} enquiries
            </Text>
          </View>

          <View style={styles.headerIcons}>
            {/* FILTER ICON */}
            <TouchableOpacity
              onPress={() => setFilterVisible(true)}
              style={styles.filterBtn}
            >
              <Ionicons name="funnel-outline" size={20} color="#fff" />
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.addBtn}>
              <Ionicons name="add" size={22} color="#000" />
            </TouchableOpacity> */}
            <TouchableOpacity
  style={styles.addBtn}
  onPress={() => router.push("/add-enquiry")}
>
  <Ionicons name="add" size={22} color="#000" />
</TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#888" />
          <TextInput
            placeholder="Search by name, phone, or email..."
            placeholderTextColor="#777"
            style={styles.searchInput}
          />
        </View>

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* FILTER MODAL */}
<Modal transparent visible={filterVisible} animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Filter Enquiries</Text>

      {/* STATUS FILTER */}
      <Text style={styles.modalLabel}>Status</Text>
      {["All", "Pending", "Confirmed", "Lost"].map((status) => (
        <TouchableOpacity
          key={status}
          style={[
            styles.option,
            selectedStatus === status && styles.selectedOption,
          ]}
          onPress={() => setSelectedStatus(status)}
        >
          <Text style={styles.optionText}>{status}</Text>
        </TouchableOpacity>
      ))}

      {/* SOURCE FILTER */}
      <Text style={styles.modalLabel}>Source</Text>
      {[
        "All",
        "Walk-in",
        "Social Media",
        "Referral",
        "Website",
        "Phone Call",
      ].map((source) => (
        <TouchableOpacity
          key={source}
          style={[
            styles.option,
            selectedSource === source && styles.selectedOption,
          ]}
          onPress={() => setSelectedSource(source)}
        >
          <Text style={styles.optionText}>{source}</Text>
        </TouchableOpacity>
      ))}

      {/* DATE FILTER */}
<Text style={styles.modalLabel}>Date Range</Text>

<View style={styles.dateRow}>

  <TouchableOpacity
    style={styles.dateButton}
    onPress={() => setShowStartPicker(true)}
  >
    <Text style={styles.dateText}>
      {startDate ? formatDate(startDate) : "Start Date"}
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.dateButton}
    onPress={() => setShowEndPicker(true)}
  >
    <Text style={styles.dateText}>
      {endDate ? formatDate(endDate) : "End Date"}
    </Text>
  </TouchableOpacity>

</View>

      {/* BUTTONS */}
      {showStartPicker && (
  <DateTimePicker
    value={startDate || new Date()}
    mode="date"
    display="default"
    onChange={onStartDateChange}
  />
)}

{showEndPicker && (
  <DateTimePicker
    value={endDate || new Date()}
    mode="date"
    display="default"
    onChange={onEndDateChange}
  />
)}

      <View style={styles.filterButtonRow}>

      <TouchableOpacity
        style={styles.clearBtn}
        onPress={() => {
          setSelectedStatus("All");
          setSelectedSource("All");
          setStartDate(null);
          setEndDate(null);
        }}
      >
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => setFilterVisible(false)}
      >
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>

    </View>

    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerIcons: { flexDirection: "row", alignItems: "center", gap: 10 },
  filterBtn: {
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 12,
  },
  addBtn: {
    backgroundColor: "#FF7A00",
    padding: 10,
    borderRadius: 12,
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "600" },
  subtitle: { color: "#888", marginTop: 4 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchInput: { flex: 1, color: "#fff", padding: 12 },
  card: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { color: "#fff", fontSize: 16, fontWeight: "600" },
  interest: { color: "#aaa", marginVertical: 6 },
  rowBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  phoneRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  phone: { color: "#888", fontSize: 12 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  pendingBadge: { backgroundColor: "#3a2d00" },
  confirmedBadge: { backgroundColor: "#003b1f" },
  badgeText: { color: "#fff", fontSize: 11 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: { color: "#fff", fontSize: 18, marginBottom: 15 },
  modalLabel: { color: "#888", marginTop: 10, marginBottom: 6 },
  option: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#1C1C1E",
    marginBottom: 6,
  },
  selectedOption: { borderColor: "#FF7A00", borderWidth: 1 },
  optionText: { color: "#fff" },
  applyBtn: {
    backgroundColor: "#FF7A00",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },

  
  applyText: { color: "#000", fontWeight: "600" },

  input:{
  borderWidth:1,
  borderColor:'#ccc',
  borderRadius:8,
  padding:10,
  marginBottom:10
},

clearBtn:{
  backgroundColor:'#999',
  padding:12,
  borderRadius:8,
  width:'48%',
  alignItems:'center'
},

dateRow:{
flexDirection:'row',
justifyContent:'space-between',
marginBottom:15
},

dateButton:{
backgroundColor:'#2A2A2A',
padding:14,
borderRadius:12,
width:'48%'
},

dateText:{
color:'#fff',
fontSize:14
},

filterButtonRow:{
flexDirection:'row',
justifyContent:'space-between',
marginTop:10
},

clearBtn:{
backgroundColor:'#2A2A2A',
padding:14,
borderRadius:12,
width:'48%',
alignItems:'center'
},

clearText:{
color:'#aaa',
fontWeight:'600'
},

applyBtn:{
backgroundColor:'#FF7A00',
padding:14,
borderRadius:12,
width:'48%',
alignItems:'center'
},

applyText:{
color:'#fff',
fontWeight:'600'
},

clearText:{
  color:'#fff',
  fontWeight:'bold'
},

lostBadge:{
backgroundColor:'#3A1F1F',
color:'#FF4D4D',
borderRadius:12,
paddingHorizontal:8,
paddingVertical:3
}
});