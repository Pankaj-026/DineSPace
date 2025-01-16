import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ResImg from "@/src/constants/imagePath";
import DineSpace_Header from "@/src/components/DineSPace-header";
import { SafeAreaView } from "react-native-safe-area-context";

const YourActivityScreen = () => {
  const [activeTab, setActiveTab] = useState("Bookings"); // State to track active tab
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [date, setDate] = useState(new Date()); // Selected date
  const [showDatePicker, setShowDatePicker] = useState(false); // Show date picker
  const [partySize, setPartySize] = useState("2"); // Party size

  const handleDateChange = (event: any, selectedDate: any) => {
    if (event.type === "ok") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    }
    setShowDatePicker(false);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <SafeAreaView>

        {/* Header */}
        <DineSpace_Header route={"/(main)/(tabs)"} name="Your Activity" />

        {/* Voucher Banner */}
        <View className="bg-purple-100 p-4 m-4 rounded-lg">
          <Text className="text-base text-black">
            A dining voucher of ₹300 is waiting for you
          </Text>
          <Text className="text-sm text-purple-700 mt-2">Refer and earn</Text>
        </View>

        {/* Tab Bar */}
        <View className="flex-row bg-white border-b border-gray-300 items-center justify-center">
          <TouchableOpacity
            className={`flex-1 py-4 ${activeTab === "Bookings" ? "border-b-2 border-[#F49B33]" : ""
              }`}
            onPress={() => setActiveTab("Bookings")}
          >
            <Text
              className={`font-bold text-center ${activeTab === "Bookings" ? "text-black" : "text-gray-500"
                }`}
            >
              Bookings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-4 ${activeTab === "History" ? "border-b-2 border-[#F49B33]" : ""
              }`}
            onPress={() => setActiveTab("History")}
          >
            <Text
              className={`font-bold text-center ${activeTab === "History" ? "text-black" : "text-gray-500"
                }`}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Rendering Based on Active Tab */}
        {activeTab === "Bookings" ? (
          <View className="bg-white m-4 rounded-lg shadow">
            <Image
              source={ResImg.Ichiraku_ramen}
              className="w-full h-40 rounded-t-lg"
            />
            <View className="p-4">
              <Text className="text-lg font-bold">Ichiraku Ramen</Text>
              <Text className="text-sm text-gray-500 mt-1">
                {date.toLocaleDateString()}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">2 Guests</Text>
              <Text className="text-sm text-gray-500 mt-2">
                Booking ID: <Text className="font-bold">12389818</Text>
              </Text>
              <Text className="text-sm text-green-600 mt-2">Confirmed</Text>
            </View>
            <View className="flex-row justify-between px-4 my-4">
              {/* Modify Button */}
              <TouchableOpacity
                className="flex-1 bg-[#F49B33] py-3 mx-2 rounded-lg"
                onPress={() => setModalVisible(true)}
              >
                <Text className="text-white text-center font-bold">Modify</Text>
              </TouchableOpacity>
              {/* Cancel Booking Button */}
              <TouchableOpacity className="flex-1 bg-white border-2 border-[#F49B33] py-3 mx-2 rounded-lg">
                <Text className="text-[#F49B33] text-center font-bold">
                  Cancel Booking
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="bg-white m-4 rounded-lg shadow p-4">
            <Text className="text-lg font-bold">History</Text>
            <Text className="text-sm text-gray-500 mt-2">
              No previous history available
            </Text>
          </View>
        )}

        {/* Modal for Modifying Booking */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-11/12 bg-white p-5 rounded-lg">
              <Text className="text-xl font-bold mb-4">Modify Booking</Text>

              {/* Date Picker */}
              <TouchableOpacity
                className="p-3 bg-gray-200 rounded-lg mb-4"
                onPress={() => setShowDatePicker(true)}
              >
                <Text className="text-center text-gray-700">
                  {date.toDateString()} at {date.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="datetime"
                  display="default"
                  onChange={(event, selectedDate) => {
                    try {
                      handleDateChange(event, selectedDate);
                    } catch (error) {
                      console.error("Error handling date picker:", error);
                    }
                  }}
                />
              )}


              {/* Party Size Input */}
              <View className="flex-row items-center mb-4">
                <Text className="text-base font-bold mr-2">Party Size:</Text>
                <TextInput
                  className="flex-1 border border-gray-300 rounded-lg p-2 text-base"
                  value={partySize}
                  onChangeText={(text) => setPartySize(text)}
                  keyboardType="number-pad"
                  maxLength={1}
                />
              </View>

              {/* Save & Cancel Buttons */}
              <View className="flex-row justify-between">
                <TouchableOpacity
                  className="flex-1 bg-[#F49B33] py-3 rounded-lg mr-2"
                  onPress={() => {
                    setModalVisible(false);
                    console.log("Updated Date:", date);
                    console.log("Party Size:", partySize);
                  }}
                >
                  <Text className="text-white text-center font-bold">Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 bg-gray-300 py-3 rounded-lg"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-gray-700 text-center font-bold">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
};

export default YourActivityScreen;
