import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DineSpace_Header from '@/src/components/DineSPace-header';
import axios from 'axios';
import { router } from 'expo-router';

const BookingScreen = () => {
  const [selectedOption, setSelectedOption] = useState('Pre-Book');
  const [partySize, setPartySize] = useState(1);
  const [isLargeGroup, setIsLargeGroup] = useState(false);
  const [largeGroupSize, setLargeGroupSize] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [resId, setResId] = useState('');
  const [restaurantDetails, setRestaurantDetails] = useState<any>([]);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('BookingDetails');
        if (storedId) setResId(storedId);
      } catch (error) {
        console.error('Error fetching stored restaurant ID:', error);
      }
    };

    fetchRestaurantData();
  }, []);

  useEffect(() => {
    if (resId) {
      axios
        .get(`http://192.168.0.101:5106/api/restaurants/${resId}`)
        .then((response) => {
          setRestaurantDetails(response.data);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [resId]);

  useEffect(() => {
    if (restaurantDetails.opens && restaurantDetails.closes) {
      generateTimeSlots();
    }
  }, [restaurantDetails]);

  const generateTimeSlots = () => {
    const slots = [];
    const startTime = parseInt(restaurantDetails?.opens, 10); // Ensure numbers
    const endTime = parseInt(restaurantDetails?.closes, 10);
    const interval = 60;

    for (let hour = startTime; hour < endTime; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const timeString = `${hour}:${minute === 0 ? '00' : minute}`;
        slots.push(timeString);
      }
    }

    setTimeSlots(slots);
  };


  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const validateAndProceed = async () => {
    if (!time || (!isLargeGroup && !partySize) || (isLargeGroup && !largeGroupSize) || !phoneNumber) {
      Alert.alert('Error', 'Please fill out all required fields.');
      return;
    }

    if (isLargeGroup && parseInt(largeGroupSize) <= 10) {
      Alert.alert('Error', 'Large group size must be more than 10.');
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }

    // Proceed with the booking API call
    try {
      const userData = await AsyncStorage.getItem("userData");
      const user = userData ? JSON.parse(userData) : null;

      if (user) {
        const bookingDetails = {
          userId: user.id,
          userName: user.name,
          restaurantId: resId,
          restaurantName: resId,
          bookingDate: date.toISOString().split('T')[0],  // Format date to 'YYYY-MM-DD'
          bookingTime: time,
          numberOfGuests: isLargeGroup ? largeGroupSize : partySize,
          isLargeGroup: isLargeGroup,
          phoneNumber: phoneNumber,
          bookingType: selectedOption,  // Pre-Order or Walk-in
          specialRequests: specialRequests,
        };

        const response = await fetch('http://192.168.0.101:5106/api/bookings/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingDetails),
        });

        const data = await response.json();
        if (response.ok) {
          Alert.alert('Booking Successful', data.message);
          router.push("/(main)/(tabs)/order")
        } else {
          Alert.alert('Error', data.message || 'Failed to create booking');
        }
      } else {
        Alert.alert('Error', 'User not found. Please log in again.');
      }
    } catch (error) {
      console.error('Error during booking process:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };


  return (
    <>
      <ScrollView>
        <SafeAreaView />
        <DineSpace_Header route="/(screen)/RestuarantDetailsScreen" name="Bookings" />
        <View className="flex-1 bg-gray-100 p-4">
          {/* Pre-Order / Walk-in Toggle */}
          <View className="flex-row justify-between mb-4">
            {['Pre-Book', 'Walk-in'].map((option) => (
              <TouchableOpacity
                key={option}
                className={`flex-1 p-4 rounded-lg mx-1 ${selectedOption === option ? 'bg-[#F49B33]' : 'bg-gray-300'}`}
                onPress={() => setSelectedOption(option)}
              >
                <Text className={`text-center text-lg ${selectedOption === option ? 'text-white' : 'text-black'}`}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Party Size */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2">Party Size</Text>
            {!isLargeGroup ? (
              <View className="flex-row flex-wrap">
                {[...Array(10).keys()].map((num) => (
                  <TouchableOpacity
                    key={num + 1}
                    className={`px-4 py-2 m-1 rounded-full ${partySize === num + 1 ? 'bg-[#F49B33]' : 'bg-gray-300'}`}
                    onPress={() => setPartySize(num + 1)}
                  >
                    <Text className={`text-lg ${partySize === num + 1 ? 'text-white' : 'text-black'}`}>{num + 1}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  className="px-4 py-2 m-1 rounded-full bg-gray-300"
                  onPress={() => setIsLargeGroup(true)}
                >
                  <Text className="text-lg text-black">More than 10</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-white"
                placeholder="Enter number of guests"
                keyboardType="number-pad"
                value={largeGroupSize}
                maxLength={2}
                onChangeText={(text) => setLargeGroupSize(text)}
              />
            )}
          </View>

          {/* Date Picker */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2">Select Date</Text>
            <TouchableOpacity
              className="border border-gray-300 rounded-lg p-3 bg-white"
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={handleDateChange}
              />
            )}
          </View>

          {/* Time Picker */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2">Select Time</Text>
            <View className="flex-row flex-wrap">
              {timeSlots.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  className={`px-4 py-2 m-1 rounded-full ${time === slot ? 'bg-[#F49B33]' : 'bg-gray-300'}`}
                  onPress={() => setTime(slot)}
                >
                  <Text className={`text-lg ${time === slot ? 'text-white' : 'text-black'}`}>{slot}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Phone Number */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2">Phone Number</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white"
              placeholder="Enter 10-digit phone number"
              keyboardType="phone-pad"
              value={phoneNumber}
              maxLength={10}
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>

          {/* Special Requests */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2">Special Requests (Optional)</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white"
              placeholder="Enter any special requests here..."
              value={specialRequests}
              onChangeText={(text) => setSpecialRequests(text)}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Proceed Button */}
        <TouchableOpacity className="bg-[#F49B33] p-4 rounded-lg" onPress={() => {
          validateAndProceed
        }}>
          <Text className="text-center text-lg text-white">Proceed</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default BookingScreen;
