import DineSpace_Header from '@/src/components/DineSPace-header';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';


const BookingScreen = () => {
  const [selectedOption, setSelectedOption] = useState('Pre-Order'); // Pre-Order or Walk-in
  const [partySize, setPartySize] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleProceed = () => {
    if (!date || !time) {
      Alert.alert('Error', 'Please select a date and time!');
      router.push('/(main)/(tabs)/order')
    }

    Alert.alert(
      'Booking Details',
      `Option: ${selectedOption}\nParty Size: ${partySize}\nDate: ${date}\nTime: ${time}`
    );
  };

  return (

    <>
      {/* Header */}
      <DineSpace_Header route="/RestuarantDetailsScreen" name={"Bookings"}/>

      {/* Main */}
      <View className="flex-1 bg-gray-100 p-4">
        {/* Pre-Order / Walk-in Buttons */}
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            className={`flex-1 p-4 rounded-lg mx-1 ${selectedOption === 'Pre-Order' ? 'bg-[#F49B33]' : 'bg-gray-300'
              }`}
            onPress={() => setSelectedOption('Pre-Order')}
          >
            <Text
              className={`text-center text-lg ${selectedOption === 'Pre-Order' ? 'text-white' : 'text-black'
                }`}
            >
              Pre-Order
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 p-4 rounded-lg mx-1 ${selectedOption === 'Walk-in' ? 'bg-[#F49B33]' : 'bg-gray-300'
              }`}
            onPress={() => setSelectedOption('Walk-in')}
          >
            <Text
              className={`text-center text-lg ${selectedOption === 'Walk-in' ? 'text-white' : 'text-black'
                }`}
            >
              Walk-in
            </Text>
          </TouchableOpacity>
        </View>

        {/* Party Size */}
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">Party Size</Text>
          <View className="flex-row flex-wrap">
            {[...Array(10).keys()].map((num) => (
              <TouchableOpacity
                key={num + 1}
                className={`px-4 py-2 m-1 rounded-full ${partySize === num + 1 ? 'bg-[#F49B33]' : 'bg-gray-300'
                  }`}
                onPress={() => setPartySize(num + 1)}
              >
                <Text
                  className={`text-lg ${partySize === num + 1 ? 'text-white' : 'text-black'
                    }`}
                >
                  {num + 1}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Date Picker */}
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">When are you visiting</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 bg-white"
            placeholder="Select Date (e.g., 2024-12-31)"
            value={date}
            onChangeText={(text) => setDate(text)}
          />
        </View>

        {/* Time Picker */}
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">Select the time</Text>
          <View className="flex-row flex-wrap">
            {['10am', '11am', '12pm', '1pm'].map((t) => (
              <TouchableOpacity
                key={t}
                className={`px-4 py-2 m-1 rounded-full ${time === t ? 'bg-[#F49B33]' : 'bg-gray-300'
                  }`}
                onPress={() => setTime(t)}
              >
                <Text
                  className={`text-lg ${time === t ? 'text-white' : 'text-black'
                    }`}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </View>
      {/* Proceed Button */}
      <TouchableOpacity
        className="bg-[#F49B33] p-4 rounded-lg"
        onPress={() =>{
          if (!date || !time) {
            Alert.alert('Error', 'Please select a date and time!');
          }else{
            router.push('/(main)/(tabs)/order')
          }
        }
        }
      >
        <Text className="text-center text-lg text-white">Proceed</Text>
      </TouchableOpacity>
    </>
  );
};

export default BookingScreen;
