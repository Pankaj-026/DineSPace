import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import DineSpace_Header from "@/src/components/DineSPace-header";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import url from "@/src/constants/axiosUrl";

const YourActivityScreen = () => {
  const [activeTab, setActiveTab] = useState("Bookings");
  const [modalVisible, setModalVisible] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [userData, setUserData] = useState<{ id: string }>({ id: "" });
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Fetch bookings and restaurant details when the screen loads
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Retrieve user data
        const storedData = await AsyncStorage.getItem("userData");
        if (storedData) {
          setUserData(JSON.parse(storedData));
        } else {
          Alert.alert("Error", "User data not found. Please log in again.");
          return;
        }
        // Fetch bookings
        setLoading(true);
        const bookingsResponse = await axios.get(
          `${url}/api/bookings/book/users/${userData.id}`
        );
        const fetchedBookings = bookingsResponse.data.bookings;


        if (!fetchedBookings || fetchedBookings.length === 0) {
          setBookings([]);
          setLoading(false);
          return;
        }

        // Fetch restaurant details for each booking
        const updatedBookings = await Promise.all(
          fetchedBookings.map(async (booking) => {
            try {
              const restaurantResponse = await axios.get(
                `${url}/api/restaurants/${booking.restaurantId?._id}`
              );
              return {
                ...booking,
                restaurantDetails: restaurantResponse.data, // Attach restaurant details
              };
            } catch (error) {
              console.error(
                `Failed to fetch restaurant for booking ${booking._id}:`,
                error.response ? error.response.data : error.message
              );
              return { ...booking, restaurantDetails: null };
            }
          })
        );

        setBookings(updatedBookings);
      } catch (error) {
        // console.error("Failed to fetch bookings:", error.response ? error.response.data : error.message);
        // Alert.alert("Error", "Failed to fetch bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userData.id]);


  // Handle Cancel Booking
  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axios.delete(
        `${url}/api/bookings/book/${bookingId}`
      );
      Alert.alert("Success", response.data.message);
      // Update UI by removing the canceled booking
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      Alert.alert("Error", "Failed to cancel booking. Please try again.");
    }
  };

  // Handle Modify Booking (Open Modal)
  const handleModifyBooking = (booking) => {
    setSelectedBooking({
      ...booking,
      bookingDate: new Date(booking.bookingDate), // Convert to Date
      bookingTime: booking.bookingTime,
      phoneNumber: booking.phoneNumber
    });
    setModalVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedBooking(prev => ({
        ...prev,
        bookingDate: selectedDate // Store as Date object
      }));
    }
  };


  // Submit Modified Booking
  const handleSubmitModification = async () => {
    try {
      const payload = {
        ...selectedBooking,
        bookingDate: selectedBooking.bookingDate.toISOString() // Convert to ISO string
      };

      const response = await axios.put(
        `${url}/api/bookings/book/${selectedBooking._id}`,
        payload
      );
      const updatedBooking = response.data.booking;

      const restaurantResponse = await axios.get(
        `${url}/api/restaurants/${updatedBooking.restaurantId}`
      );

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === updatedBooking._id
            ? { ...updatedBooking, restaurantDetails: restaurantResponse.data }
            : booking
        )
      );

      Alert.alert("Success", response.data.message);
      setModalVisible(false);
    } catch (error) {
      console.error("Failed to modify booking:", error);
      Alert.alert("Error", "Failed to modify booking. Please try again.");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#F49B33" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <SafeAreaView>
        <DineSpace_Header route={"/(main)/(tabs)"} name="Your Activity" />

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
        {/* Render Bookings */}
        {activeTab === "Bookings" ? (
          bookings.filter(booking => booking.Status !== "Completed").length > 0 ? (
            bookings
              .filter(booking => booking.Status !== "Completed")
              .map((booking) => (
                <View key={booking._id} className="bg-white m-4 rounded-lg shadow">
                  <Image
                    source={{ uri: booking.restaurantDetails?.imageUrl }}
                    className="w-full h-40 rounded-t-lg"
                  />
                  <View className="p-4">
                    <Text className="text-lg font-bold">
                      {booking.restaurantDetails?.name || "Unknown Restaurant"}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-1">
                      {booking.bookingDate} at {booking.bookingTime}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-1">
                      {booking.numberOfGuests} Guests {booking.bookingType}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-2">
                      Name: <Text className="font-bold">{booking.userName}</Text>
                    </Text>
                    <Text className="text-sm text-gray-500 mt-2">
                      Phone Number: <Text className="font-bold">{booking.phoneNumber}</Text>
                    </Text>
                    <Text className="text-sm text-gray-500 mt-2">
                      Booking ID: <Text className="font-bold">{booking._id}</Text>
                    </Text>
                    {
                      booking.Status === "Pending" ? (
                        <Text className="text-sm text-gray-500 mt-2">
                          Status: <Text className="font-bold text-yellow-500">{booking.Status}</Text>
                        </Text>
                      ) : booking.Status === "Waiting" ? (
                        <Text className="text-sm text-gray-500 mt-2">
                          Status: <Text className="font-bold text-red-500">{booking.Status}</Text>
                        </Text>
                      ) : booking.Status === "Cancelled" ? (
                        <Text className="text-sm text-gray-500 mt-2">
                          Status: <Text className="font-bold text-red-500">{booking.Status}</Text>
                        </Text>
                      ) : (
                        <Text className="text-sm text-gray-500 mt-2">
                          Status: <Text className="font-bold text-green-500">{booking.Status}</Text>
                        </Text>
                      )
                    }

                    <View className="flex-row justify-between mt-4">
                      <TouchableOpacity
                        onPress={() => handleModifyBooking(booking)}
                        className="bg-blue-500 px-4 py-2 rounded"
                      >
                        <Text className="text-white">Modify</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleCancelBooking(booking._id)}
                        className="bg-red-500 px-4 py-2 rounded"
                      >
                        <Text className="text-white">Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
          ) : (
            <View className="bg-white m-4 rounded-lg shadow p-4">
              <Text className="text-lg font-bold">No bookings available</Text>
            </View>
          )
        ) : (
          bookings.filter(booking => booking.Status === "Completed").length > 0 ? (
            bookings
              .filter(booking => booking.Status === "Completed")
              .map((booking) => (
                <View key={booking._id} className="bg-white m-4 rounded-lg shadow">
                  <Image
                    source={{ uri: booking.restaurantDetails?.imageUrl }}
                    className="w-full h-40 rounded-t-lg"
                  />
                  <View className="p-4">
                    <Text className="text-lg font-bold">
                      {booking.restaurantDetails?.name || "Unknown Restaurant"}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-1">
                      {booking.bookingDate} at {booking.bookingTime}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-1">
                      {booking.numberOfGuests} Guests {booking.bookingType}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-2">
                      Name: <Text className="font-bold">{booking.userName}</Text>
                    </Text>
                    <Text className="text-sm text-gray-500 mt-2">
                      Phone Number: <Text className="font-bold">{booking.phoneNumber}</Text>
                    </Text>
                    <Text className="text-sm text-gray-500 mt-2">
                      Booking ID: <Text className="font-bold">{booking._id}</Text>
                    </Text>
                    <Text className="text-sm text-gray-500 mt-2">
                      Status: <Text className="font-bold text-green-500">{booking.Status}</Text>
                    </Text>
                  </View>
                </View>
              ))
          ) : (
            <View className="bg-white m-4 rounded-lg shadow p-4">
              <Text className="text-lg font-bold">History</Text>
              <Text className="text-sm text-gray-500 mt-2">
                No previous history available
              </Text>
            </View>
          )
        )
        }

        {/* Modify Booking Modal */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white p-6 rounded-lg w-11/12">
              <Text className="text-lg font-bold">Modify Booking</Text>

              {/* Date Picker */}
              <Text className="text-sm text-gray-500 mt-2">
                Update Date
              </Text>
              <TouchableOpacity
                className="border border-gray-300 rounded-lg p-3 bg-white mt-4"
                onPress={() => setShowDatePicker(true)}
              >
                <Text>{date.toDateString()}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedBooking?.bookingDate || new Date()} // Fallback to current date
                  mode="date"
                  display="default"
                  minimumDate={new Date()}
                  onChange={handleDateChange} // Remove arrow function wrapper
                  accentColor='#F49B33'
                />
              )}

              {/* Booking Time */}
              <Text className="text-sm text-gray-500 mt-2">
                Update Time
              </Text>
              <TextInput
                value={selectedBooking?.bookingTime}
                onChangeText={(text) =>
                  setSelectedBooking((prev) => ({
                    ...prev,
                    bookingTime: text,
                  }))
                }
                placeholder="Booking Time"
                className="border mt-4 p-2 rounded"
              />


              {/* Update Phone Number */}
              <Text className="text-sm text-gray-500 mt-2">
                Update Phone Number
              </Text>
              <TextInput
                value={selectedBooking?.phoneNumber}
                onChangeText={(text) =>
                  setSelectedBooking((prev) => ({
                    ...prev,
                    phoneNumber: text,
                  }))
                }
                placeholder="Phone Number"
                keyboardType="phone-pad"
                className="border mt-4 p-2 rounded"
              />

              {/* Action Buttons */}
              <View className="flex-row justify-end mt-4">
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="bg-gray-500 px-4 py-2 rounded"
                >
                  <Text className="text-white">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmitModification}
                  className="bg-blue-500 px-4 py-2 rounded ml-2"
                >
                  <Text className="text-white">Save</Text>
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